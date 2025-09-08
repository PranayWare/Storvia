# Step 1: Base image
FROM node:18-alpine

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy entire project files
COPY . .

# Step 6: Build the project
RUN npm run compile
RUN npm run build

# Step 7: Expose port
EXPOSE 80

# Step 8: Start the app
CMD ["npm", "run", "start"]

