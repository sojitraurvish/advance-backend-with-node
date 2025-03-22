# first define base iamge of node and we use alpine version(why alpine linux based low wait),and this image also contain npm, nvm i mean node related things
From node:16-alpine

# then specify working dir that mean we tell docker this is our working directory 
WORKDIR /app

# this commad says that supporse i run docker build from my termial form week-15-live-1 that mean copy all the code from this diractory and put all code inside my app working dir which is /app # Note: here i thing to keep in mine this when you copy conetnt form week-15-live-1 you may have node_modules that you should not do, we will run npm install so it will automatically come so either delete node_modules or you do not copy that and for that create top level .dockerignore file and add node_modules, dist folder i mean all the things that you do not want to copy over 
COPY . .

# the run the commond that do run in teminal these command to make ready your application not to start you application
RUN npm install
RUN npm run build
RUN npx prisma generate 

# and our app is ruuning on port 3000 (in index.ts file) so you want to tell docker container to expose port 3000 on this specific container
EXPOSE 3000

# now you might have question that why here you write cmd and then start the server way here also as like above you do not use RUN cmd, that is because until EXPOSE 3000 that all the command that help you to create the image and this command run that create image and start the container taht how the CMD is diff form the RUN command
# F!1 all above thing run when you run docker build and this CMD command runs when you run docker run command but this is not the optimal way of doing this and before we see the optimal way we need to understand docker layers
CMD ["node","dist/index.js"]

# see all cmd desc in pic 16