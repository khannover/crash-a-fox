'use strict';

const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const DB_PATH  = path.join(DATA_DIR, 'highscores.db');
const PORT     = parseInt(process.env.PORT, 10) || 3000;

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Open / create SQLite database
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

db.exec(`
    CREATE TABLE IF NOT EXISTS highscores (
        id         INTEGER PRIMARY KEY AUTOINCREMENT,
        name       TEXT    NOT NULL,
        score      INTEGER NOT NULL,
        mode       TEXT    NOT NULL DEFAULT 'normal',
        created_at TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
    );
    CREATE INDEX IF NOT EXISTS idx_score ON highscores(score DESC);
`);

// --- Prepared statements ---
const stmtInsert = db.prepare(
    'INSERT INTO highscores (name, score, mode) VALUES (?, ?, ?)'
);
const stmtTop = db.prepare(
    'SELECT name, score, mode, created_at FROM highscores ORDER BY score DESC LIMIT ?'
);

// --- Express app ---
const app = express();

app.use(express.json({ limit: '10kb' }));

// Serve the game as a static file
app.use(express.static(path.join(__dirname), { index: 'index.html' }));

/**
 * GET /api/highscores?limit=10
 * Returns the top N scores (max 100).
 */
app.get('/api/highscores', (req, res) => {
    const limit = Math.min(Math.max(1, parseInt(req.query.limit, 10) || 10), 100);
    try {
        res.json(stmtTop.all(limit));
    } catch (err) {
        console.error('GET /api/highscores error:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

/**
 * POST /api/highscores
 * Body: { name: string, score: number, mode: string }
 */
app.post('/api/highscores', (req, res) => {
    const VALID_MODES = new Set(['normal', 'music-easy', 'music-normal', 'music-hard']);

    const rawName  = req.body && req.body.name;
    const rawScore = req.body && req.body.score;
    const rawMode  = req.body && req.body.mode;

    if (typeof rawName !== 'string' || typeof rawScore !== 'number') {
        return res.status(400).json({ error: 'Invalid payload: name (string) and score (number) are required.' });
    }

    // Sanitise inputs
    const name  = rawName.replace(/[<>&"'`]/g, '').trim().slice(0, 20) || 'Anonym';
    const score = Math.max(0, Math.floor(rawScore));
    const mode  = VALID_MODES.has(rawMode) ? rawMode : 'normal';

    try {
        const result = stmtInsert.run(name, score, mode);
        res.status(201).json({ id: result.lastInsertRowid, name, score, mode });
    } catch (err) {
        console.error('POST /api/highscores error:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.listen(PORT, () => {
    console.log(`Crash Fuchs server listening on port ${PORT}`);
    console.log(`Database: ${DB_PATH}`);
});
