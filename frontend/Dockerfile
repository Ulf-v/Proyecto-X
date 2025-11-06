FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Build Tailwind CSS
RUN npx tailwindcss -i ./public/styles/input.css -o ./public/styles/output.css --minify

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
