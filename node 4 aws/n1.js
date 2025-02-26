// loginin awa then type ec2 in search box then got to instances

// click on launch instances button on top right cornar to create new instance

// steps
// give name 
// select type of os use want to use
// select instance type (if you want to save money then select t2 micro and it is free for month)

// key pair login
// what would happen when i click on lauch instance button it will actually start new instance then server is started but i will have to do login to access it and somehow deploy my code there for that key pair are one easy way to do that. you can also create password for your machine and login, but keypairs more manageable thing to keep in mine, (keypair mean a pair of pubilc and private keys) 

// if you do not have key-pair -> click create new key pair btn to create it, give name, chose key pair type as rsa, private key file format as .pem and click on create key pair btn
// and that will download your key pairs
// do not share this any one otherwise they will have access to your machine
// each ec2 instance has there certain key pair
// once key is created select that key in key pair dropdown

// cloud provider
// aws  

//  but why do i need to use service provider why can not i deploy it on my local machine and use or access it everywhere (if i run it through localhost)  it it because of you do not have called the public ip address and that way we rant a aws server(or any server) which has two thing 1) you can acccess it from anywhere 2) and you will have public ip which i link to my domain and i will be able to access to my server how do i reach there through routers

// do we understand why cloud providers it they are not there we have to hire data center and create our own server which is costly

// next step after generating public private keys 
// whenever you start machine on internet you go there and run node index.js on post 3000 and thd ip of this server so something
//  the way you visit the server by first ip:port 3..1.5.7:3000 very much similar to what we do in our local localhost:3000 here localhost is public ip in local machine
// and more fancy eventually you point domain name to your ip api.urvish.com:3000 the point is there is something running on that port on that machine and that port should be open on the internet and aws provides you that functionality to configure port.
// by default all the port are private if you want it to make pubic to access it by public then you have to tell aws server to open that port for public

//  in network settings options 
//  firewall - a security group is a set of rules that control the traffic for your instance, Add rules to allow specific traffic  to reach your instance.

//  there are three checkbox 
//  there is one checkbox here is by default checked (Allow SSH trafiic from) 
//       what is ssh(secure shell) - this is a protocol which will run in my terminal to connect to this aws server. and since i want that i can connect to my server and deploy my code there on server, So i want to open this ssh port on my aws server which by default is port 22 which is why by default it is selected, if i do not what to open this port to deploy my code then there are other option to and i can uncheck this checkbox.
//  (Allow HTTPS traffic from the internet) -
//  (Allow HTTP traffic from the internet)


// what is http and https traffic 
// if there is aws server that i am ranting where i am running index.js on port 3000 if i want world to visit this on app.urvish.com:3000 then we will say open the port 3000 but where do i want people to go to visit it, it want them to visit app.urvish.com no good website have port :3000 right because all popular sites like facebook google are like google.com , and
//  which is why this app.urvish.com and this app.urvish.com:80 are same

// ssh port is 22
// by default HTTP is port 80 
// by default HTTPS is port 443 this is more secure version of http

// when you are in aws machine you run node index.js and les't say you hard coded the port 80. you did not do app.listen(3000) you did app.listen(80) now i directly visit my app with app.urvish.com without using port at then end. so if i now visit 3.5.10.11:80 it is equivalent of me visiting http://3.5.10.11, so if i start the process on port 80(app.listen(80)) with node index.js then i want that is port(80) should be open for the world on the internet so that whenever people visit this http://3.5.10.11 we want it to hit our node js process which is running on the server and which is why i had selected http traffic from any where option which open port 80 and selected https traffic from any where option which open port 443 so can i open more ports yes, but not by here when we start a new server so there we see how to open new port
// and right now in network section it is showing that anyWhere 0.0.0.0/0, ::/0 Note: Rules with source of 0.0.0.0/0 allow all IP addresses to access your instance. We recommend setting security group to all access known IP address only. that mean this ip (0.0.0.0/0) all so it is telling use all other public ip on the internet can access your port 80,443,22 which you are allowing and via (0.0.0.0/0) this you can say that all the public ips can access it but you can ristrict it by changing this (0.0.0.0/0) and you can only give access to spcific ip for that you have to create diffrent rules that we will see letter on

// so deso i just need to open https and close ssh and http port does this make my application secure so that my server is accessable through port 443(https) only, i make secure in some senarios but we again come to this security part letter on
// right now i opened all three ports

// and there is last option of storage that how many space you want like 2 20 gb select that and that si enough to you to launch the instance so click on launch instance btn it will take some time and once it completed you will be able to see that

//Note:- and do no forget to stop it at the end if it is not needed otherwise it will cost you a lot when free trieal is completed and when you see instance status running it is stated and it is builling me also ,

// option that we can see is 
//  name - the instance name that we have given 
//  id - unique id for that instance 
//  type of the instance
//  status - is it woking
//  avalibility zone - this is sort of important when you login in so on top right corner it allows you to select rigion it mean aws have taken server around the world so you can choice any rigion which you want i am starting in mobai, avalibiiry zone mean inside that also perticualr region which you can choice 
//  pubilc IPV4 dns - with it i can 
//  pubilc IPV4 ip (right now it is 13.234.111.39:port via this i can access it) if i right now visit this ip with port 80,443, and 22 i am able to access it but i is showing nothing is running there but it is open but if i send request on any other port it the my request get stucked because that random port are not opened the how to open them let see

// first lect the instance and go to security section click on security rules and use can change this inbound rules where defalut reles are sets for port 80,22,443 vua any if which is why it set to 0.0.0.0/0(iPV 4) or ::/0(IPV6) (photo 1) so here you can add port and update your security group here

// now i want ot ssh in to this server mean connect to this server 
// first move this sertificat file some where(where you can persist it) then go that folder in your terminal (file name urvish-test-2.pem) where this file is located, now the way to coonect or ssh to the server is. 
// i mean command is this  - > ssh -i<the input to the certificate file> urvish-test-2.pem ubuntu@<ip of your machine (see photo 2)> and after pressing enter you will get this error (photo 3) permition 0644 for urvish-test-2.pem are too open  

// you have to run this chmod 700 urvish-test-2.ptem and againg run above commad and it will connect, this sertificate file should not have access to all that way we run this chmod command it will limit the permition

//  what does 700 mean in this chmod command permitions 
//  if do ls -ltr then it shows me this -rwx------ other file info i have rwx permition, other and group does not have any permition
// 1,2,4 = 7 mean all the permition read write execute to only me not to others and group

// ssh mean secure shall protocol

// so not by running above command i am connected to my server

//  now i will clone my backend code on server by git clone <uri>,some time when you start server you do not have internet access how do i connect to the internet but how do i know so i got these errors(see phto 4) so how to fix this is open this file and add this entry over there (see photo 5,6,7) and you have to add that entry for both normal and super user (see phto 8) and add that entry after that you will be able to access internet form your aws server and you will be able to clone your repo, once it get cloned  









     









