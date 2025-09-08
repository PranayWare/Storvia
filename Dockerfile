FROM node:18-alpine

WORKDIR /app

# Install latest npm version globally
RUN npm install -g npm@9

# Copy package.json and package-lock.json first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY packages ./packages
COPY themes ./themes
COPY extensions ./extensions
COPY public ./public
COPY media ./media
COPY config ./config
COPY translations ./translations

# Compile source files to dist
RUN npm run compile

# Build the project
RUN npm run build

# Expose the application port
EXPOSE 80

# Run the app
CMD ["npm", "run", "start"]

