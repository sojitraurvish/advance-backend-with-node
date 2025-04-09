// how many other way backend system talk to other backend system (see pic 1) this is called michro services, monolith architecture mean one big server
// 1 web sockets
// 2 http apis
// 3 pub sub - your main backend pubilsh event and say someone has bought a t-shart so first backend send them email second send them text message and third will aggrigate there sales in database
// 4 messaging queue


// why to need multiple backend processes and one backend  need to talk with other one
// 1 as your application grows you do not want to put everything on single backend system
// 2 async processes 
//          1) notification - your logic run on main server but push notification reaches to user letter point of time but your main server should not worrried about that
//          2) analitics - your main server is not track your website analitics

// so your main server for instance calcuation and other servers for async process
// in ecomm plateform you see product every day but calculate profit at once in day with async process baeacuse at that time also you want keep selling your prodcuts

// if someone buy somthing form your ecomm you your main server do calculation and put data in db, and you calculate your daily profite as well so which above approach you should use

// one example of that is paytm (see pic 2) - when someone sends money to someone your main server do so calculation and update the db and other server send push notification, one send phone notification, and one for email, but why we need these three diff seperate backends and queue for each, assume you are managing everthing with same server and if your email service down so should your main backend should wait for that much time, instead it should be given to queue and your other server will be processing that and if fails again put in queue an pick it up,(you can use rabit mq queue or radis queue), but here now if your backend server not main backend server a one which for push notication is down then your proceess stay in queue and whenever your service goes up it will start picking form queues and send push notification, so is not it like it takes too much time yes it takes because these are async process, when your order somting form swigge your order happen instantly but you see notication after 10s to 100s

// another good example is leetcode - where people can able to come and send coding prompts should you evalueate it on main backend itself, you should not beaause the c++ program thay are submiting might have infinite for loop and that will take control of your main server, then where should you run there code you should run that code on some separate server but not on your primary backend server,  so take user req and push it on queue most probebally letcode have two queue (see pic 3) primium and  free user queue for pimium user shoul get there answer instantaniousely

// NOTE - whenever you dipendent on another service you maintain a queue why beacasue if that service fails it push request back to queue and whenever again server is up or after sometime it start proceessing it, bast example is blockchain 

// this is what about how backend system talk to each other
// but how bigger app talk each other more complex apps

// type of communication (see pic 4)
// sync - process my request right now i will wait for your response, or when you are waiting for response from another server
// async - when push req in queue and you say someone else will handle  as long as it push it queue you can go you do not need to wait for acknowledgement  from the other service  

// so now some one ask question about your pevious company that how server user to talk in your last company async or sync , then i would say sir async, we have massing queues between our main primary server  and our email server the primary server push thing in messaging queue the email server pull it and send it out to the other users 


// now lets learn websockets(see pic 5) - it create persistant connetion that you do not create in https(send requset get response and clonse the channel) (see pic 6 diff between http and websocket comm), and it is full duplax mean both the parties client and server both can send the events or data to each other, in http you can send event from server to client

// FOR real time communication you use websockets

// how letcode build there system 

//(this is how your sholuld do ) how it should happen in leet code (see pic 7) - whenever you create problem you tell them for submition it will pick it in queue then other service pick form queue and do the solution and whenever it is succeed it will put in database idially when this event happen i mean when you get solution it(other serivice) should also tell your websocket server(main server) the submition faild or succeded and then this your main server websocket server respond back to you that you got a wrong answer this is how i expect to build the system 

// but how it is happening in leetcode (see pic 8) = leet code use someting called polling, still leet code when you submit problem it's main server put in queue then external service take it from queue and process it and put in db  now we are not connected to main server via web socket it uses connection polling it just asking every one second is my solution done is i get wrong answer sending that request again and again so it keep polling leet code server and it is another way to do real time communication       

// long polling another way to do real time communication, sould you do , it denpens


// how to create http server in js 
// express
// koa
// hono

// how to build websocket server(see pic 9) - there is guid in first link that how you should build websocket server (if you are in tradding companny you may need to build)

//  how to create http server (see pic 10)
//  there are three ways first two are pure websocket implementations third one called socket.io(beginner friendly way) even though it is wrote on websockets but it is having some problems like it is harder to support multiple plateforms in it(Android, IOS, RUST), there are implementation for androd,and RUST but not up to date, but websocket is very global protocals so websocket clients generally exitsts very frequestntly there is android websocket connection, website supports websockets by default as like fetch exitsts as api  to send the backend request WebSocket also exsits as constrat on client(browser) that you can use, rust also has websocket client implementation, evnen though you can use socket.io, many company statted using beacause it is too easy, but you should not, and it gives you  constrancts like rooms that let you send data to client very easily but you should avoid it and just sick with core websocket protocol, and ietf created websocket(which is protocol and every plateform have that) not socket io socket io is kind of wrapper on websocket

// polling vd long polling

// polling - each second request server it give you output if process is done or simplete say not then you requset again on second second is is done, i mean you keep polling untill it is not done

// log polling - here you send i send requst once and i keep that connection open untill you do not finish the task once you done with it send me with https

// queue (see pic 12) - ec2 machine which runs rabitMq or redis for queue  and allow you to pop and push from queue

// i thing you need to take care is how to create websocket connection and how to scale it
// we are using ws library for websocket connection

// whenever you are creating websocket server you are creating http server only if you go through the protocol web socket protocol like how is it built the first connection browser makes  a first request the browser sends it is an http request only its get upgraded to a websocket connection on the server but the first request that goes out is an http request which is why whenever you are creating websocket server there is an http server running under the hood it is still exposed on certain port which is an our case port app.listen(8080) so you are actully creating http server, only the server whenever it gets websocket request it upgrade the request to the websocket full duplex connection

// here we have two implementation of websocket server one is using  using express(see pic 14) and using http server(see pic 13), this is native http library in node js but both the way inner the hood or at the end there will be http server which will be handling your request 

// but we use it with express because it gives very nice routing and all other feature
// if you are using http server or expess server creating websocket server logic remain same just creating http or express server logic differs

// import express from "express";
// import http from "http";
// import { WebSocketServer } from "ws";

// const app = express();
// const port = 3000;

// const server = http.createServer(app);

// const wss = new WebSocketServer({ server }); pass here http server as argument you can also do it without http server you can do noServer:true and it is still create an http server

// E.X 1 - mine) const wss = new WebSocketServer({ noServer:true });
// E.X 2 - mine) const wss = new WebSocketServer({ noServer:true });

//  but sometime you want multiple websocket connection, so whenever user connects to ws://api.binance.com/ws/btcusdt@trade  they goto 1 websocket server(E.X 1 - mine) if they connectws://api.binance.com/ws/usedata they connect to another websocket server(E.X 2 - mine) so you can read through the code of ws library they have bunch ho example on there website go and check there

// wss.on("connection", async (ws, req) => {
//     ws.on("error",(err)=>{err}) // whenever there is error
//     ws.on("message", (message) => { // here in websocket can not crate diff event as like in socket io here all the messsage arrive throw this message event and same thing for when ever you send message you just send back message there is noting like socket.io events
//         console.log("received: %s", message);
//         ws.send(`Hello, you sent -> ${message}`);
//     });
// });

// app.get("/health", (req, res) => {
//     res.json({msg: "I am healthy"})
// })

// server.listen(port);



// see pic 15 - here client send some data server and respond back some data
// create websocket server instance
// here socket.on("message") will send the message to every connected client with server and check if socket connection is open for them  and sed them the data

// how send websocket request (see pic 16,17 this message commes form server that code you wrote in pic 15)
// right i have single websocket connection as i send messages i am sending all the messages to same websocket connection i am not doing frash handshack every time (see pic 18), i am resending data in single request again and again , so i connect server once (see pic 19) and resend data to that same connection (see pic 18), i am not creating multiple connections or doing fresh handshack every time 

// i wrote frontend websocket code pic by pic see pic 20,21,22,23 how to recieve server message to client
// your backend server is listening on port 8080 so crate front websocket servet with 8080 see above pics
// how to send message form client to server(see pic 24)

// also close websocket connection from client side (see pic 25)

// Note - if you are using next js then create this websocket connection on client side because you want your client should be connected to websocket otherwise your next js server get connected to client that you do not want(see pic 26)

// use can also create custom hook for connection(see pic 27)

// scaling ws server (see pic 28,29) - IN case of https assume you have 1m user but every one may not be sending request at same time may be 5k people send request at same time and then after they are chilling on same page so scaling http server is easier(see pic 30), but if you have 1m user in real time application and there are websocket connection then your server fill connection to 1m user and single websocket server can not handle it because you are persistantly connected to everyone, and there are some banchmarks on how much connection single socket.io server supports, how much node js socket.io server supports  i think it is nearly 10 to 20k users per server you can not support more than that, if you have 1m  user and you have websocket server then you need fliet or more then one websocket server a single websocket server can not handle entire load, (see pic 31) if you are using Node.js( on single 1 core) can support 10 to 20k user and if there is 1m user then you probaally need 50 to 100 servers ,if you are using Rust on 32 core then you might support more, so that how you sale web socket server, the problem comes when these sesions are sticky so i have 1m users first 10k users connected to ws1, second 10k conn to ws2, third conn to ws3, now from first 10k send message hi there and one of it's peers in the same room is on another server ws2, (the problem is  there is one user is connected to ws1 another user on same room connected to diff websocket server now how you transmit the message from user1 in ws1 to user2 in ws2)

// sticky conn - there might be 50 people in same room, sitcky conn mean that you will make sure even if there are multiple people one present in india, one in us, one in uk  if they are part of same room then all three users should be connected to ws1 or same websocket server and this is the one way to sale and this why harkirat used in gather.town this is one ugly way to scale websocket servers by sharding them(see pic 32), what is better way - does not matter what room you are,(see pic 33) if you are in uk connecte to uk server ws3, if you are in us conente to us server ws2, if you are in india conente to india server ws1, even if you are in same room this is the better way to scale but what is the problem in this, the problem is i am in india i send message to my friend in us then this message need go from ws1 in india to ws2 in us to my peer who is connected in same room in us, it need to go from one websocket server to anotehr which is way it is harder to scale but better why beause i am near to india server, us person is near to us server, uk person is near to uk server and you can scale beyond 10k users, if you have sticky connections if you are putting everyone in same room on same server then you are ristricted by that 10k number you can not have more than 10k user in same room but if you have very big application 1m user in same room is when this architecture works better, but how this architecture works,(see pic 34) there are multiple ways most esiest one is you create pub sub whenever person form india conenctes they tell server ws1 that hey i am part of room 1 now ws1 tells pubsub that i am subscribe to room1 if any one send you message (ws2,ws3) on room1  tell it to me so that i can tell it to harkirt in india or me, now  suppose alex connects form us and he also says i am part of room 1 throw ws2 to pubsub now any time alex send message to websocket server, ws2 server publishes it to pubsub, and pubsub is like who else need the message form room 1, india server okay at there you go ws1 and it reaches to me, and that how you can scale horizontally in better way by not using sticky sesstions still both approches are good gather.town is billon doaller company but still uses sticky connection but there is just limit 200 pople in same room if you have more than 200 people in same room than it is hard to support audio, but if you system is going to grow like discort then you need second approach.

// in socket io there is very easy way to create rooms but here in websocket you have all the conneted client with wss.clients array but you have to maintain gloable variable and store that this client in this romm this client in this room and check code folder form harkirat maintain_core_websocket_room

// if you have game you move your self so it si fine if you miss some event in between and get new location directly so as long as eventual location get trasmited it is fine if some events are missed so for application like this webrtc might work beacuse it happes on udp it happes on tcp but you can set as udp the banifit of udp is it happens faster but the down side is flew event get missed but does not matter, so it is chice that you use webscokets when you need tcp when you need to make sure that event goes to the other like chat system you can not miss chat message, but can you miss movement yes you can the person moving around very quickly set all the data via udp or webrtc when they stop for more than 2 seconds let send the message via tcp or web scokets that how you can dicide to use 

// how does game like conter strike work

// if there are 100 people is playing counter strike firstly they have sticky session, when you are playing coutner strike then everyone is connected to the same server or the real time server, may be they do not use websocket they use someting else, but every one connected to same server, the extra thing that happens is there is some game logic on the server, the server it self stores - when  you send it message right that i am moving up, i am moving forword the server maintaines that harkirt is at 2,3, and some does same thing then server maintain aman is on 2,4 location(see pic 35), but why you need to do this beacuse  what if the person tells you no no i am at 200,200 they can spoff events right so every thing maintain on server and specially when you shoort someone, you send the server logic the message that says i short person from position 2,3 or whereever you are with this rifal, and then the server will calculate that does that mean other person dies or not the server is the source of truth because you might be on very bed internet connection you might be on very goood connection, what if you send shoort but your apponent moved a bit then who decides is that person dies or not,(see pic 36) if you are playing counter strick and fi there are some letancy between two guys you said shoort and second guy says harkirat shoort form this position but this event reach that client after 2 second the the person would have moved so the second person fill like he did not dei and third person fill that seond persond die, the one extra thing is happern is the server is source of truth for game like counter strike when you shoort someone the server will be like based on the current positions this person is died  and it will tell every one that this peoson is deid, it will not tell everyone that (shoort, 2,3 , rifle), it will tell everyone short was mad whatever  but it will also decide wather other person is died or not, you will not on the client side decide that the shoort is done other person position is this it will die or not, the logic to some one die or not, the logic to someone is died or not wheather you pick up bomb need to happen on server so that what happen on realtime game, in realtime game your server maintain lot of logic your server is a source of truth, who won who lost who short and who got short and your clients never decide that so the event are just extra(becaluse also perform some logic) then just borcasting to everyone 
// read more about multiplayer games

// (see pic 37 just to learn) (when user get connected to perticualr room store there websocket logic and push in array (see pic 38))

// if you have 100 users you can use webrtc p2p connection 
// if you have 1k users then use distributed SFU architechture that we i think discuss above indian user join india's server 

// why to use grphql (see pic 40)

// if you want 1day, 7day, 10day, 1month, 7month data to store and you want all these data togather when you use charts use timesdb

// when you have sticky connection you use load balanceer in between and check ther okay you are user1 from room1 okay then you goto ws1 server like that (see pic 41) 


