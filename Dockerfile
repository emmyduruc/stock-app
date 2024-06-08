FROM node:18.14.1

# Setting my working directory in the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock to the working directory
COPY server/package.json server/yarn.lock ./

# dependencies installation
RUN yarn install 

# Copying code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# the command to run my backend and frontend app
CMD ["sh", "-c", "cd server && yarn migration:run && yarn dev"]


