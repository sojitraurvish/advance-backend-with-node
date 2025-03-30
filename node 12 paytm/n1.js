// you have to track very havily when you send and recieve money hdfc (see pic 2) that money is reach or not to bank beacause you have to relay on external service in this case external service is hdfc bank api

// here in paytm we have 2 thing frontend backend and db now when you make the payment you got redirected to bank page and when payment get success you get again redirected to your app page but here we need somting called webhook to listen our bank continueslly is payment got sucess or not, because otherwise user directly open payment success page and tell your main backend that i did payment, or sometimes while payment is being done user referesh the page, then transaction may have done but our user does get know that why we need webhooks that continouselly listen to our banks and give update when transation get success of failed or money is debited to your paytm acc (see pic 3), this hdfc api may told you two times that we give paytm 200 ruppes even you send one time, so do not update in db twice, how you check that using session id 

 // 1 more quetion is why you cereate seperate backend for this webhook beacuse it is direactly talking to bank you do not want it like it goes down that's why 

// 
// 1 more thing people what is thay may want to send money to there hdfc back they say we do not like your service any more
//(see pic 1)  here 1 thing you can do is hit hdfc endpoint for if and success or filed you show that to user, here when you hit end point that also written web hook and when your paytm money reach to hdfc back that webhook update you in either cases weather it suceess or failed but in these two cases we do not have any problem because we get responce back but it may happen that this hdfc service may get down(because these service is anrelayable) in that case you want to retrying it in that case you need another service , we call it withdrawal service it's job is very simple if someone has asked for withdrawal then this withdrawal request sit in a queue and it ping the request to hdfc server if it get success then update the balance in db but it get faild in taht case add that agian in queue and after certain time try again (and this service again one webhook)

// one more senario is if user click on pay button twice for 200 rs and in your hdfc back balance is only 200 the both the request directly go then is problamatic if both the request get pocess together so for that create queue and service piced up 1 requst not other service can peek up that request form queue utill it does not get success of faild (see pic 5)

// Notes
// process 1 request at time

// see pic 6 for 1 more ref for weebhook 

// what is onramping

// when user take money to his paytm acc it will call the hdfc api hdfc send link with token and when user pay hdfc do two things first i will -200 rs from that user acc and add it to paytm acc(it will add this things may be once in days because lot of transations), second it will call webhook service that we did -200 form that user acc so please now update the user balance in your db so user can see, so paytm has this endpoint or webhook  internal.paytm.hdfc to tell hdfc to paytm and this is called web hook and finicial services talk to banks

// e.g make my trip
// i first go to make my trip, book some ticket,ane whe i go to this final banking page now i have to pay 10,000 to make my trip (see pic 7), so i selected option netbanking and selected hdfc bank, now i click on payNow, now the thing should happen is from my hdfc bank acc money should be debited and created to make my trip acc, for that when i click on paynow request go to make my trip server, okay so MMT say i have to charge 10,000 rs from this user but it does not have access to this user's hdfc bank acc, so here MMT just know that this user want to pay via hdfc bank, so while processing this request it tells hdfc server, i have user with id 10(MMT id) who want pay 10,000 to me via hdfc please give me url where i can send them, then hdfc says okay send them to netbanking.hdfc.com/token=someting<this will be given by bank> and your server send same thing to frontend and you redirect the user to netbanking.hdfc.com (see pic 9 ), now when user done transation(form the token hdfc know that this is that user for that MMT told me to deduct this much money), but how does MMT get know that urvish have paid the money because all this interations are happening on hdfc page,so when hdfc transation get scucess(at imidiate time hdfc do not transfer money to MMT acc, it will do once in day), but it will update and call MMT server (via webhook - why - because we send user to hdfc page now we do not know when payment will accure, so we need once seperate backend as webhook which continouselly listen to hdfc so when payment is done hdfc all our this service we actually prvide end point to hdfc to hit when payment is done) that this user have paid 10,000 rs you can give him tickets so our webhook server update this info in db,
// 
// what should not happen is when payment is done you should not redirect user to sccess page or MMT page and form there do not update backend that payment is done and also told form MMT server to hdfc server that payment is done instead of that hdfc server dirctly talk to MMT server and update the data in db that for this user payment is done

// in case fo roserpay and stripe the above process remain same
// roserpay api talk to your api via webhooks 

// one more thing then this webhook can be used by any one to make flase requests , we will create password for that in this web hook and that password we share to only hdfc bank no once else, it mean whoever is want to use your webhook you have to share the password with them to use and call you webhook when payment is done you also can do ip base blocking but password is inough to solve this problem

// week-18-2.-final steps(see image 10)

// see in db
// when ever user signup we should put atleast one entry with 0 balance in his wallate
// onRamptransation whenever you start transation you put entry here with status=pending and when your webhook get called you should update it with success
// hdfc bank,diff bank , card, upi all these are onRemptransation
// what if your hdfc server is down and it won't call your hook then your payment in pending state for hours the you can add check for certain time or like 2 hours then assue it get faild and you can add some checkes, what if your webhook server get down the hdfc sever will ping you after hour, mean after centain period of time and it will keep retrying

// in your /hdfcWebhook you should not first find the user and then update the balance because if requst comes at time to credate 200 and 400 rs and both together runs then your balance became from 0 to 400 not 600 instead you are using the query that we use in this endpoint to update blance it may uses trasation managed query inner the hood

// when the transation start you put the entry in onramp table and again when webhook call your api you find that transation with token and update the data see in endpoint /hdfcWebhook

// one more thing you kee in mine that in this /hdfcWenhook api you have to send the success code 200 then they got to know that you have correctly updated user balance if you send 411 then they refund the user money

// and here 1 more thing you have to do with transation management is you have to put entry in both the table if transation fail then revert the transaction and also send 411 to hdfc as faild the transation and revert the user money back to there bank accc

// marchant transtion
// offRamptranstion send the money out the bank

// how to store into  in db to show graps on dashdashbord uing charts- timeseries databases -and timescale database is one of them - why you need these kink of databases becasue in chatst how have to show suppose 1 month, 2 months ... perfomacge so there is range from 1 motnth to 2nd month so to cash diff range of data you need these kind of dbs, you can do it in nomal data base also but here there is lot of user interations so it is better to user timescalse to cashed the data

// what is onRampTransaction - when user put money select the bank,card, it taks you to bank page finish transation there and it will tell your server we send some money to you in paytm bank you can put in user wallet now so these are onRampTransation

// when you click on add money button(see pic 11) you should add the entery in onRamptable and when it get success cahnges the status success from pending

// create function in /app/lib/actions/createOnRamptxn.ts
// in this function token comes from bank but here we generated redom string
// in amount * 100 so it should not goes decimal values you can do it on backend but right now we are doing on frontend (see pic 12)


// now we do not have real bank that will call our webhook service so, in bank-webhook folder we made that web hook that bank call, but right now we do not have bank server that call that api so we have to call it by our self, and with that we increase user balance and make onrapmtransction success 

// fisrt we request to bank bank give you link with token that link you give user and also send token so bank identify the user with token you also send money and all with it

// how do ptp trnsfer (phone to phone transfer) you can send money to someone's phone number
// ptp mena mean pear to pear transfer one person on paytm can send money to other person on his wallet

// what if your webhook server is down for 10 days the your bank keep hitting your webhook and at the end it refunud you money, it will keep hitting your server utill it do not found this success captured (see pic 13), and if i do not happen in next 7 days(your web hook does not get called) then bank will refund your money, and you can see keep retring histroy in plateforem's dash bord like rezorpay

// etl pipeline in aws, if lot of request will comes and updated ne data then use this pipeline and create new data and and use it for next 15 mins and and do same process

// use normal data base put all the data, leter on you introduce serch based on username then dump that data in elastic search and start using it for search

// 1 issue if user has onRapmtransation processing then and only you should increate the balance for that perticualr transation with /hefcWebhook

// how let's see ptp transation 
// see file for api code week-18.live.1.final/apps/lib/actions/p2pTransfer. function takes two arguments To - phone number, and amount that you want to send

// here we are just transfaring money from one acc to other acc but here there is once problem 
// what if this user at time sends lot of request(see pic 13,14) then both the request read blace of data base at the same time and and diduct blance twice even though user does not have saficient money balance goes to negative , let see how to prevent this, and for this we have to lock that perticulare row, we need to make sure that if one request is reading the user1 balance, then second request should not be allowed to do that, you can bulid like queueing system and process 1 by one request that defenetly works(see pic 15) but for one user you can put request in queue but for second person you have to process reqeust parallar(see pic 16) and that why this approach is bad, but database already provides this and it better that you perform lock at database leavel that mean when requst comes you tells database that this row is locked, i am right now dealing with this row  do not allow anyone to read form this row do not allow anyone to write on this row make them wait, so if multiple requst comes for same row it will wait for first to finish, once first is finished only than the second requst allows to read form the database(loacking - allows you to lock single row, multipe row, entire database it totlly depends on you ), but in our case we just want to lock one row so if we lock this row so untill first transaction completes till any requset won't be able to read that row, all other requst waits, but now how to add lock on that row in this file week-18.live.1.final/apps/lib/actions/p2pTransfer

//  await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`; // FOR UPDATE - mean lock the row
// well there are many ways to update lock in data base but we use FOR UPDATE query - whenever you select certain amout of rows FOR UPDATE you lock those rows untill entire trnsction will not finish or commit no one else will be able to read those rows and your above backend logic works and send you mess insufficient balance

// this locking we have to do in protgress only not in mongo db because while processing trnsaction one request if another requeuest comes then mongodb automatically revert the transction so we do not need to do any locking over there if we are using mongodb

// there are type of locks like read write for multiple people as well

// we need to update our schma to store p2p trnscation (see pic 17) , we create this track or our how we get this actual blance, and for users so they have transaction history

// Ci/ Cd pipelines (see pic 18)

// ci - when you create pull requst(or even before people commit there code) check all test passing are they following code practices, are test still rining, is code linted well, so here there is somting like workflow tha we run to check all bove things 

// cd - is deploy automatically from github to whereever you hosted your codebase

// see pic 19,20 how to deploy with docker and when to use docker while hosting your code

// workflow - is like when new commit came now i will run bunch of setps to check code(following code practices, are test still rining, is code linted well) but through workflow in there machine and run bunch of steps, mean when i push the code (see pic 20) your code fist cloned to github machine <- it is dockerized and where your workflow is running(see  pic 20) (run all the checks via workflow), the final doker image will be push to docker hub then this github machine will diploy your code to ec2 machine.
// github machine - you have to start this machine, no when you set ci cd workflow then github start it automatically, do they charge anyting to run workflow action, not initially they give 60 mins compute free so if your process takes 1 min to run and push docker and to the ec2 then you can run it 60 times and then you have to pay and these workflow steps you can decide

// so now we see anytime when i push commit a process start that build and pushes my code to ec2 machine that what we do here

// optimization in monorepo is if there is 3 app then buid only one that one optimization you can do

// let's first see CI(see pic 21)
// when someone try to merge some code in my repo via commit or pull request i should run a workflow that makes sure that the code that they are pushing in it is build correctly there are now error and for that you can create pipline and when someonce push the code it will run workflow but i have to approve it and run workflow why, otherwise everyone on internet push the code and i have to pay for pocessing

// so we have to define two things when someone push the code run check and what the check need to be run and if you are using github the place where it is define is inside .github folder in your project here you can define bunch of things but we will focus on workflow today create folder .github/workflows and add lint.yml file what is .yml file explain you while learning docker that it is very similar to json file
// list.yml (see pic 22)


// name: Linting and formatting on PR
// on:
// 	pull_request:
// 		branches:
// 			- '**' // any time pull requests on any branch run bellow these specific job, a job called <Continuous-Integration:> and the name of it is this <name: Performs linting, formatting on the application runs-on: ubuntu-latest>, and runs on this spcific machine <runs-on: ubuntu-latest> of michrosoft asure (because github own by michrosoft) now firt step is <uses: actions/checkout@v3> checkout or clone the repo on github machine, next step install all the dependency over there then run linting process and format runs if any of these steps fails the final pull requst workfol also fails and if it success you get succes message like this (see pic 23)

// jobs:		
// Continuous-Integration:
// 	name: Performs linting, formatting on the application runs-on: ubuntu-latest
// 	runs-on: ubuntu-latest // this mean it will run on ubantu github machine of microsoft
// 	steps:
// 		- name: Checkout the Repository
// 		uses: actions/checkout@v3 // this mean clone the repo, but how does this actions/checkout@v3 clone our repo you can also wirte here git clone <repo link> to clone but you have to inject bunch of secrate and it will be logn process to clone, so instead that you use the actions that other people wrote already, search action/checkout and you get opensorce repo and it says(see pic 24) this action check-out your repo under $GITHUB_WORKSPACE, so your work flow can acces it , so you can use this action directly 

// 		- name: Install Dependencies
// 		run: npm install --legacy-peer-deps

// above two scripts are okay how from where these to bellow scripts comes form (see pic 25) it is part of our project
// 		- name: Run linting check 
// 		run: npm run lint:check

// 		- name: Check formatting 
// 		run: npm run format:fix

// if above any script fails then here at this pull requst section(see pic) i have big red mark here so i as mentainer can lookat it and ignore it, and tell devloper to fix first fix the workflow then i will look at your pull reauest   that why CI is very helpful, before CI i had to manually clone his branch and check that is this person list the code corrrectly or not but now i can simpally use CI for that

// see pic 26 for all step expalination

// now let create CI for this prject our primary focus on when someone push the code our build should not faild

// now consider repo week-18-2-final 
// first run build stap locally and make sure it is not failing locallay

// step 1 : first create this file .github/workflows/build.yml(push this file to github) so github know when to run workflow  

// name: Build successed on PR // name of pipeline or workflow

// on: // when should above action run when any pull request happens to master branch
//   pull_request:
//     branches:
//       - master

// jobs:  // the jobs that you want to run, job is an array
//   build: // we want ot run single job a build job
//     name: Build the project // name of the job
//     runs-on: ubuntu-latest // runs on this machine ubuntu-latest on github
//     steps: // steps that you follow
//       - uses: actions/checkout@v3 // this clone the repo on github machine
//       - name: Use Node.js
//         uses: actions/setup-node@v3 //install nodejs , you can search for this action on google, it will install all node dependencies
//         with:
//           node-version: '20'
      
//       - name: Install Dependencies
//         run: npm install // install all project dependencys
        
//       - name: Generate prisma client // you can also write this script in package.json 
//         run: cd db/packages && npx prisma generate && cd ../..

//       - name: Run Build
//         run: npm run build // if this build step get successed the your pr git this green right tick as you (see in pic 27)

// in this .yml file indentation is very important so make sure that you wirte each steps correctly
// all this files called diff workflows and .github folder with diff workflow called ci pipeline, cd pipeline we see letter on
// now first push this workfolw file on github, and now anyone create pull request your build.yml workflow will run and create build to check it is getting any error or not 

// now when you create pull request, workflow stats automatically on action tab and run each action one by one and if it successed the i can see green check mark on pull request tab 

// if you canges anyting in this file you have to push to update your workflow and this how you can create CI pipeline

// now how to create CD pipeline (see pic 28)

// you need to have one acc on these plateform ec2, digitalocean

// right now we just doning row thing, otherwise these machines need to be auto scale to hanle load and all but right now we just do busic thing to deploy, and if you want to deploy on auto scalling server user can use these (see pic 29)

// but we do it like there is no auto scaling kubernatic does not exits now how you depley with CD pipeline

// step 1 : dockerize you app (you can do it without docker as well because we just pushing it on signle ec2 machine you just need to make shure ec2 machine have ec2 install, has npm install, has whatever you need) but to do slight advance things we deploy it via docker which mean our github action will clone the repo, containerize it, push the image to docker hub and, than ec2 machine pull the iamge from docker hub and rerun the docker image

// step 1 : dockerize you app,(create generate image file), right now we have three apps so we have to create three docker file, you can not create three processes on single docker file so you need three docker files, generally when we have multiple docker file then we create one root lavel folder called docker and put all the docker files there only right now we have Dockerfile.user so all the setps there to create image and this file steps are decided for monorepo so step minght confuse you but there are package module and that why the way it written , once you create docker file push those changes to github

// now create second workflow that run when every commit get added to the master branch, when auto depoly should happen not when someone create pull request it should happen when first workflow of ci run successfully and that pull request become commit of your master branch then second workflow should run, but there shuold not be some protection, yes there should be that why we crete dev branch(dev automatically update new code when commit happen in dev branch) and once in week we merge that dev branch with our master branch, and this call release cycle and in dev branch your tester test your code

// 1 clone the repo
// 2 dockerize it
// 3 step - push it to docker hub

// 4 push it to ec2 machine (this step keep on changeing because are we deploing ec2 server, or gcp server, or kubernatice cluseter) - for this forth setp we need ec2 machine 

// just to know - asg auto sclling group in aws for auto scale, you can also create kubernatice cluter and have rules there like if cpu uges extends to this limit then create new port, you can also do somthig called ecs elastic contaienr service, gcp also

// create CD pipeline of first three setps,for that create beelow file and push it to git hub for first three steps

// name: Build and Deploy to Docker Hub

// on:
//   push:
//     branches:
//       - master  # Adjusted to trigger on pushes to master

// jobs:
//   build-and-push:
//     runs-on: ubuntu-latest
//     steps:
//     - name: Check Out Repo
//       uses: actions/checkout@v2

//     - name: Prepare Dockerfile
//       run: cp ./docker/Dockerfile.user ./Dockerfile

//     - name: Log in to Docker Hub
//       uses: docker/login-action@v1
//       with:
//         username: ${{ secrets.DOCKER_USERNAME }}
//         password: ${{ secrets.DOCKER_PASSWORD }}

//     - name: Build and Push Docker image
//       uses: docker/build-push-action@v2
//       with:
//         context: .
//         file: ./Dockerfile
//         push: true
//         tags: 100xdevs/web-app:latest

//     - name: Verify Pushed Image
//       run: docker pull 100xdevs/web-app:latest

//     - name: Deploy to EC2
//       uses: appleboy/ssh-action@master
//       with:
//         host: ${{ secrets.SSH_HOST }}
//         username: ${{ secrets.SSH_USERNAME }}
//         key: ${{ secrets.SSH_KEY }}
//         script: |
//           sudo docker pull 100xdevs/web-app:latest
//           sudo docker stop web-app || true
//           sudo docker rm web-app || true
//           sudo docker run -d --name web-app -p 3005:3000 100xdevs/web-app:latest

// to deploy your app
// step 1 create above CD file  
// step 2 create this script in your package.json file
// "start-user-app":"cd ./apps/user-app && npm run start"
// step 3 make sure your docker iamge build propely so copy this docker/Dockerfile.user file on root folder build image and run contaner to check weather it is runing or not, cmd cp ./docker/Dockerfile.user ./Dockerfile
// you do not need to copy docker file in root folder you can run this commad (see pic 31) 

// someone says that instead of doing this you can use precommit hooks like hasky but there are trust issues with this commad you can directly push your code without being check by your precommit hook git commit -m "adfds" --noverify
// eslint is diff 