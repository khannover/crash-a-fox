# Basis-Image: Ein leichtgewichtiger Nginx Webserver, basierend auf Alpine Linux
# Perfekt für statische HTML/JS/CSS Dateien (Simple prevails!)
FROM nginx:alpine

# Arbeitsverzeichnis setzen
WORKDIR /usr/share/nginx/html

# Lösche die Standard Nginx index.html
RUN rm -rf ./*

# Kopiere unsere HTML-Datei in den Webserver-Ordner
# (Die index.html muss sich im selben Ordner wie das Dockerfile befinden)
COPY index.html ./

# Exponiere Port 80
EXPOSE 80

# Nginx starten
CMD ["nginx", "-g", "daemon off;"]
