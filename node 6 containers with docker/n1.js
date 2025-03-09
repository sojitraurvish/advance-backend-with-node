// how to install docker and run comma in pic 1 if it  not woking than docker is not woking 

// without docker pic 3
// with docker (pic 4) 
// if you start index.js on port 3000 in docker contener then it runs indipedently your moachine do not need to care about that
// it means inside that contaner it is using port 3000 not of my machine
// if i hit localhost:3000 in my machine then my request will not reach to my docker container (pic 4), this request is like nothing is running on my machine on port 3000 someting may be runing mini computer in my machine but not in my main machine that what container help you to do, it helps you to isolate the code, it says this code is running but it is running indipedently in small machine inside your big machine, in my big machine still i can run one node process indipendently on port 3000, container has it's own file system its's own network so if i have index.js file in contaner then it is diff from which i have in my own machine

// if you want then you can route the to the container which is comming to your machine on port 3000 (pic 6), so that it worth while otherwise you are just running container without request 

// it mean docker alllow us to create container which is like mini machines and which has it's own network and filesystem

// but why it useful today so now if you want to start mongodb or postgres database locally then you do not need to follow traditional entire process, you can create seperate containers for them and they will be runing inside container with their own enviroment inside your machine without affecting your machine, and you can also redirect those request to that indiviual containers on specific port number(pic 7), 

// 1 docker let's you create container  
// 2 it help you map the port of you machine to the container so any requiet comes for my big machine goes to mini machine (container)

// pic 8,9
// now we want to install mongodb but how we can instaill it from mogodb side by trediaitional way no no, just like you  push your code to git hub, you can push  images  to docker registrais, images means anyone in world who want to share there package out in the world for other people to run, like mongodb and postgres, they first create an image and which contain all the depedency that mogo needs and likewise for other images and it also in order suppose mongodb need python before mogodb runs then the contain clearcut instraction for that, you can assume it as pre recodded cd which you give you to your friend to install windows like that it just not contain only windows but also contain other dependency which are require for windows to run  

// but where can i get this imges from you can git it form , you can get these image form so called registory , and there are lot of places from where you can get these images from and docker hub is popular one (pic 9_1)

// if i just search dokerhun mongo then i get this page (pic 10) this contain image of mongodb, so the image you can get form internet and run that image which will strat my mongo container(pic 10), so what is container : container is noting but the image in execution

// mongo registory (pic 9_1)
// posgres registory (pic 11,11_2)

// but now let's see how to start containers 

// pic 12

// docker run
// docker ps
// docker kill

// if i wnat to start mongo db locally the commad i run is 
// docker run <name of the image = mongo >  // so here docker pull this image from the docker hub and start it locally, so i have strated container in with mongo is runing on it port which is (mongo port 27017) so after contenter is started i can connect it with my mongo compoass (see pic 14,15), but here is one preoblem which is i have started mongo but i did told that any req for port 27017 comes to my big machine which i want to forword to my container of mongo which is running on port 27017 that why i am unable to connect my mongo compass, so i have to do port mapping, so i have started mongodb but no one can access it, it is just running indipendently if you want to allow that any requst that comes on this machine on port 27017 should routed to this docker container on port 27017 (pic) and for that we have to run anouther command so first exit from the container is ruunnig so now noting is runing , now let first do port mapping

// if you want that any request that comes on your machine sould routed to mongo contener so this is the command you have to run 
// docker run -p <your machine port 27017>:<27017 port in docker container> mongo
// docker run -p 27017:27017 mongo

// if i want that any requst comes on my machine on port 27015 that should be routed to 27017 in docker container then (see pic 17)

// other docker commands(pic 17,18)

// if you wnat to run mongo container as backgruond process 
// cmd docker run -d -p 27017:27017 mongo

// now how to see above thing is runing or not
// and how to see how many images are cuuretly running in foregroudn and brackground
// cmd docker ps

//  now let see how to kill the process  // now noting is runnin and nothing is listening on any port not my macine not doker container
//  docker kill <process id> (see pic 19)


// now if you want to start postgress locally(docker 20) it has someting extra that we will see 
// cmd docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
// -e mens evnvariment varibable postgres_passwrod and evrythis is same just password is this
// so postgres has defalt password i do not give any but i want to give 

// see pic 21 this password goes for postgres connection string 
//  but how i know that how many or which envaroment variable it has, see in docker hub

// (see pic 22)then how did you figurout username and which table to conenct , so by defaut postgres has defalut username and passworkd and this every thing is mention on docker hub (see pic 23)

// above i start container and now if my container is running and i want to go inside it and run command
// cmd : docker exec -it <container Id> /bin/bash  