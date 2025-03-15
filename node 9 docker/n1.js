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