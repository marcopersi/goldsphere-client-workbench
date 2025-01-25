# Verwende den Node.js-Container als Basis
FROM node:18

# Setze das Arbeitsverzeichnis
WORKDIR /app

# Kopiere package.json und package-lock.json
COPY package*.json ./

# Installiere Abhängigkeiten
RUN npm install

# Kopiere den Rest der Anwendung
COPY . .

# Baue die App
RUN npm run build

# Nutze einen leichtgewichtigen Webserver, um die App auszuführen
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Exponiere Port 80 für den Container
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

