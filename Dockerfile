# 1. Image de base (légère)
FROM node:20-alpine

# 2. Créer le dossier de travail dans le conteneur
WORKDIR /app

# 3. Copier les fichiers de configuration
COPY package*.json ./
COPY prisma ./prisma/

# 4. Installer les dépendances
# On utilise 'npm ci' pour une installation propre basée sur le lockfile
RUN npm ci

# 5. Copier le reste du code source
COPY . .

# 6. Générer le client Prisma (indispensable pour PostgreSQL)
RUN npx prisma generate

# 7. Compiler le projet NestJS en JavaScript
RUN npm run build

# 8. Exposer le port (informatif, Render utilisera sa propre config)
EXPOSE 4000

# 9. Commande de lancement
# On utilise une commande qui lance les migrations Prisma PUIS l'app
CMD npx prisma migrate deploy && node dist/src/main.js