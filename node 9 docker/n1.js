// why docker is important (see pic 1)
// 1) kubernates/Container orchestration
// 2) running process in isolated environment
// 3) statrting projects/auxilary services locally

// what is container see pic 2
// why containers see pic 3
// benifits of using containers pic 4

// docker options see pic 5
// whatever cmd you write that it goes to docker engine see pic 6

// when i run docker run mogodb then docker engine first find this mogodb image form somewhere from docker repo might be

// diff between docker image / container (see pic 7)
// if you fetch 1 time docker image form docker registory you can run container multiple time because you image already know the dependeny it your software requrie to run (see pic 8)

// how to see how many images i have in local or i have fetched
// cmd docker (images see pic 9)

// how to see all running containers in the machine
// cmd docker ps

// docker has deamon enging (see pic 10)

// mongo image is on docker hub so if you want to use it so you can pull it by running this command (see pic 11)
// cmd docker pull mongo 

// you can also delete images from your machine because it takes unnecessory space by this cmd (see pic 12)
// cmd docker rmi mongo --force
// and use cmd docker kill to kill containers

// how to start your own containers (see pic 13) 
// cmd docker build

// how to create images by our own (see pic 14)


// if you want to start week-15-live-1 without docker then you have to write bunch of commands, install lot of dependencs
// now let's do it with dokcker so first create Dockerfile and all the setps that i did in terminal without docker that i just need to write in docker file so that docker knows that how to start you application 
// 
// 

// got to docker file of week-15-live-1
// (see pic 15)
// first define base iamge of node and we use alpine version(why alpine linux based low wait),and this image also contain npm, nvm i mean node related things

// then specify working dir that mean we tell docker this is our working directory 
// NOTE : see all cmd desc in pic 16 and also see Docker file for commads 

// above we wrote all the docker commnd in Dockerfile in week-15-live-1 folder
// now how to build and create the images
// make sure that you are in the same folder where you Dockerfile lives
// cmd docker build -t <-t option allows us to give here image name>
// cmd docker build -t <image name> . <- this dot mean where you want to put the generated image
// so with this we crated the iamge 

// docker images <- now see that image that you have craeted 

// now simply run that image that you have created
// docker run -p 3000:3000 backend

// i do not crate and .env than also i can inject environment variable in my node js appcation without docker see pic(18)

// DO NOT PUT YOUR ENV IN TO .ENV FILE because do not want to push it on github or docker hub while creating image so when you create container you can inject the environment variable like this (see in pic 17)

// how to go inside running container and run the command this command -it mean run in interactive mode that mean we want to run mutiple commands so we need complte access and want to go inside containner  see pic 19

// inside container you can run cmd top to see cpu usages

// if you do not want to go inside mean do not want to run it in interactive mode the it will just execure single command and exit from the container (see pic 20) but why at the end they write /bin/bash that mean it start the bash sesstion for you

// to exit form the container cmd exit

// how to pipeline works for generating new image every time when you push the code to github (see pic 21)

// next video continue with docker

// how to push your image on docker hub (see pic 22)

// in this video we learn 4 things
// network and volumes
// leayers
// and docker compose

// 1) leayers in dokcers

// # F!1 all above thing run when you run docker build and this CMD command runs when you run docker run command but this is not the optimal way of doing this and before we see the optimal way we need to understand docker layers 

// when you are creating the image then you are creating layers so first base iamge that is fisrt layers and then all the layers each line is one layers and so on and it run line by line so assume second layers is some extra thing on top of first layer each layer on pic is mark with red arrow(see pic 24), there is benifit of craeting these layers incremetally which is you can cash these layers, now assume that you are useing same iamge in two Dockerfile then that image is cashed so when you run the second doncker file it will not need to bring or pull this image from docker hub that image is cased and reused, now assume you have two Dockerfile which does have first three layers or line exact same then those three laryers get cashed and reused

// how layers are made (see pic 24)

// see how layers are cashed while creating image (see pic 25)

//  now use week-15-live-2 

// now if you change soming in index.js then what the content is present in previous image index.js is diff then it rerun run COPY . . command adn all the upcomming layers not used cashed one (see pic 26) 

// essence of layers (see pic 27) and it cashed layers regardless of folder it is cashed in your machine

// we do not really need to care about all this cashed layers thing but whenever you are rebuilding your react app you want that no chased layers should be more so that your same code does not rebuilded when build your image , so you have to write layers in a such a way that more number of layers get cashed

// now how do that above thing so assume senario that you need some more dependency and you install that and due to that package.json get changed and due to that step 3 get run again so you need to create Dockerfile in a such a way that when you rebuild the new image at that time maximum steps should get cashed

// and right now npm install is running mutiple times (it should only runn when you install new paackage) but it also running when you change someting in your code as well, so let's do that and cashed npm install  and do not run when code chnages (see the pic 28) now we are only running npm install if any dependency get change in package.json or else we just copy changed code for that see the code in (Dockerfile inside week-15-live-2)

// we try to put this command as bellow as COPY
// networks and volumes (see pic 29)

// volumes - if you are runing mongo container locally you add lot of data into that but when you stop that container and rerun it then that data is gone so if you want to persist that data then you store in volumes (because containers are transatory whatever data you put in container that get lost when you kill the container) or (whenever you want to persists data across multiple restart use volumes), so if you start your container with volumes then any thing happens like you do restart or your container get crashed then data is shorted in volumes you get data form volumes so it is good practice to start then container when you have containers like mongodb
// now lets create containers with the volume, so first create the volume and when you crate container we will attatch this container to volume then we see

// to create volume 
// cmd docker volume create <volume_name>

// to see all the created volumes that you have
// cmd docker volume ls

// now how to crate container with volume (see pic 30, for reference 32)
//  docker run (-v volume_name:/data/db ) -p 27017:27017 mongo
// but what is /data/db (see pic 31) this is the folder where mongodb stores your data so this is the folder that i want to be persisted across the restarts so then mean i want to perist the folder where the mogodb stores the data with the help of volume, and in case of prosgres it is diff 


//  now refer repo week-15-live-2.2

// network (see pic 33) if i run node js in my mac machine and then try to access mongo db who's port already maped then i can access mongodb but as per the image i try to access mongdb with node js which is running in seperate container then i won't be able to access it because nodecontainers request goes inside itself where nothing is running(mongodb) which is running on seperate container, and to make your containers to talk with each other you need connect them with same network
// network - whenever two containers need to talk to each other then you use network (assume in one container your backend is running and in second container your mongo is ruuning now if your one container want to talk with other then it need the network it can not talk directly)
// but with network you can talk to your database container you even does not need port mapping if you connect with same network (see pic 34)

// Note : in week-15-live-2.2(with this we create one container) we have db file which try to connect our second container without network in either cases if it get successed  or filded then we get console log right now we are getting failed log because we did connect our both the conainer with same network and without it they can not talk or connect to eachother  

// to create network
// cmd docker network create <my_same_custom_network_name_that_i_created>

// to see all the network (there are veriouse types of network but we are going to use is most popular bridge that help us to connect multiple containers see in pic 35)
// cmd docker network ls

// now with above command we started the network now we need to make sure when we create node container and mongo container we need to attach we these containers with this created network

// Note : first start mongo container then and only start our db or node js container

// to start containers with the network which we have created (see pic 36 for cmd) 
// docker run -d -v <volume_name>:/data/db --name <container_name> --network <my_same_custom_network_name_that_i_created> -p 27017:27017 mongo

// now before starting node js container go to your db file in which, in db url add above <container_name>(that you gave to mogodb) as host (see pic 37) because this  <container_name> eventually resolve in some ip which is the ip of your mongo container

// but before that let's first build the image for this node js conainer and if you have already build this image without <container_name> as host in db url then rebuild this image
// cmd docker build -t <mongo_app - image name - this need just bellow> .

// now write the command to start your node.js container
// cmd run -d -p 3000:3000 --name <container_name> --network <my_same_custom_network_name_that_i_created> <mongo_app - image name - just above> 

// to see the console logs of perticular image 
// cmd docker ps
// cmd docker logs <Container Id>

// and we have successfully connected our containers with same network (see pic 38) so now our nodejs container can talk with mongo container






