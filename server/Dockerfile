FROM node:18.14.1

# Setting my working directory in the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# dependencies installation
RUN yarn install 

# installing nodemon
RUN yarn global add nodemon

# Copying code to the working directory
COPY . .

# Generating prisma client
RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 3100

# the command to run and watch my backend app
CMD ["nodemon", "-L", "--watch", "src", "--exec", "yarn", "dev"]


