// // see this video on youtube(s p 1)

// //  let's learn web rtc(see pic 2)

 
// And we will kick things off with, I don't even remember, I think week 23 or '20 '4, which means it's been almost six months now. Wow. It's been six months, or close to that since we've started the zero to one journey. This is the last week for zero to one folks. So if she was in zero to one, thank you.

// This was a lot of fun. The advice will remain the same. Just keep now complete whatever backlog you have and then, you know, move over to the other side. Start doing a lot of things in other people's projects on your own rather than, you know, learning through the cohort. Today we'll be doing a bunch of WebRTC.

// We'll basically try to understand the basics of WebRTC. We have already done this fairly well in a YouTube livestream, although this is very ad hoc, what was done here. By ad hoc I mean, you know, I was just coding, not explaining much. But pretty much what we're doing today is very similar to what has been done in this livestream live. There's the code from this livestream right here that you can look at in case you want to directly look at the code and then, you know, call it for today.

// If you want to learn it from scratch slowly, slowly, slowly, understand some more fundamentals of WebRTC in a beginner friendly fashion, then feel free to stick around. We'll be doing a bunch of this WebRTC stuff from slide one to slide seven ish, seven to eight. And then slide nine is an important one, which, you know, you know, if you don't want to do go through all of the basics, then feel free to just watch it during the recordings. But this slide will cover the other architectures, the primary architectures of using WebRTC today. What we're learning today, peer to peer WebRTC isn't really used for a Zoom like call or, you know, anywhere.

// For example, if you're going to add WebRTC to chess, If two people are playing a game, they should be given an option to see each other. We might also add it to app.hundexx.com. If you want to ever ask a doubt on a video, you can, let's say, for example, you know, click a button that says ask a doubt, on a specific video and a TA pops up. This will this is not happening. I'm just saying this is one use case that might happen.

// Note :
// So, you know, if I had to build both of these, I will not use the architecture we're discussing today. The architecture we're discussing today is what used to be used in 2012, '20 '13, '20 '14, when, you know, the more modern architectures weren't a thing. But when Google Meet came, Zoom came, the new architectures that we are discussing here in ninth the ninth slide are what are used. So, you know, I'll discuss this a little bit, but I will create a PR, or I'm sure someone else will, on the chess repository to add video communication to it if two people are playing the chess game. And then you will look at that code to see it.

// It's not if you understand today's class, if I'm being honest, today's class is what is highly convoluted. By convoluted I mean, you know, number one you will have to learn a lot of things. Number two you will, you know, have to understand a few things that you can completely ignore if you go to slide nine. The modern architectures, the modern libraries that have been built, on top of those modern architectures sort of hide a lot of WebRTC stuff from you. But today, since we're doing WebRTC from scratch, we have to sort of deal with all of that WebRTC jargon, which basically is the second slide, you know, things like a signaling server, what is TUN, what are ICE candidates.

// Note:-
// And all of these get hidden if you use an external library like we've mentioned here in the ninth slide, a library like, you know, Media Super, Pion. So pick and choose, you know, which one you want to do. For me, I personally did a little bit of this peer to peer WebRTC and then directly dived into other architectures. Basically, the company that I was working at, the very first company I did WebRTC in, they had directly, you know, used this specific library called MediaSupe. So most of my learning directly happened through this library.

// Later down the line when I was, you know, interviewing at other companies is when I sort of read about all of this jargon to prepare myself for an interview. But you don't really need it to build the right thing on day one. You can just go through the documentation of these libraries and understand it. That's a brief overview of what we're covering today. Today we'll try to go through this.

// Note:
// We'll try to build a basic peer to peer application. Basically, an application very similar to this Omegle, thing that we build built on the live stream, where, you know, one person can send video, another person can receive video, and vice versa. And tomorrow, most probably, we'll try to set up the chess repository locally and integrate this code over there. That means, you know, we'll try to, number one, understand how to set up the chess repository. Number two, understand how to start it locally and, you know, integrate another code base in it, and then, you know, test it out, see if it works, things like this.

// Cool. That's it for this week. It's a decent wish of a bit of an overview. Let's get right into it. Let's understand WebRTC.

// I mean yeah. Let's get right into it. Why WebRTC to begin with? Why should you learn it? And the answer is, you know, you don't need to.

// WebRTC isn't a hot field anymore as hot it used to be, you know, back in 2020, '20 '20 '1. All the hot companies that raise like crazy, for example Hopin, Gather Town, Airmeet, ten different companies. Aviom was raising left, right, and center. If you build anything closely related to real time video, they haven't had any round funding around in the past three years, and, you know, they're still going on that runway, and they're very overvalued. So, you know, they don't hire as aggressively as they used to, but there still are companies out there.

// And, you know, recently I was looking at one of the comp one of the names that I mentioned, one of these companies is Page, and, you know, they had two openings for senior video engineers. So WebRTC niche knowledge is still probably, you know, a good way to get a remote job. Because number one there is zero competition there, well at least until we discuss it today. Because not a lot of people want to do it, neither do people know about it, WebRTC isn't a thing anymore. And number two, you know the companies that have raised millions and millions of dollars, they still have runway of a few years, at least the next three, four years.

// So they will still invest in WebRTC engineers. Another good company that comes to mind is LifeKit over here. That's probably one of the good companies that have done really well. So, you know, LifeKit is also open source so you can look at their code base and, you know, if you feel like contributing, contribute. And that probably I would do that if, you know, I wanted a high paying remote job today, wasn't getting one anywhere because of competition slash no one is hiring.

// I would, you know, find one of these open source projects that have raised, are currently doing well and, you know, contribute to them. Lifecread is just one such repository. Lifecread is written in Go. So, you know, none of the cohort knowledge is going to help there a lot because, you know, we have not discussed Golang, which also means again there might not be a lot of competition. Cool.

// Note
// Let's get into it. WebRTC is the core slash only protocol that lets you do real time media communication from inside a browser. Now real time media communication is a nuanced term. Real time communication also means a live match but specifically the real time communication we are talking about today is a sub second live call, which means the time it takes for my audio to reach you is less than one second, probably a few milliseconds. The reason that is the reason I emphasize on this so much is because there are other protocols,
//  like HLS being one, where if, you know, you can have a three to five second delay a lot of times when you're on a YouTube live stream, you will receive HLS video from the other side.
// You will not receive WebRTC. So WebRTC is used in live calls. That includes things like Google Meet, a Zoom call, a lot of times in some games. These are the common examples of, where WebRTC is used. Where is WebRTC not used even though it is a live thing?
// Number one, cricket matches. Number two, a Twitch stream or a YouTube live stream. Because over there, a five to seven, even ten, seven latency is fine if the game comes a little bit later.
//  But WebRTC, you know, is very expensive. Basically, if you have a million people in India currently, watching a match, you probably don't want to do it over WebRTC because even though you get a lot of low latency, you also get number one, extremely high prices, and number two, the chops are really high.

// Versus if you use something like HLS, which is another protocol, it stands for HLS(HTTP live streaming). It has HTTP in the name. So, you know, if you use HLS, then you get some ten second, delay. But it is good for things like cricket matches because you *get prime quality. If you use something like WebRTC, you get zero point one second delay, something like that.

// Basically, you and I are currently on a WebRTC call. Used for live, you know, basically g meet kind of things or Omegle when both the sites need to interact. Currently, if you look at it, you and I don't need to interact. We don't have a two way channel open, So we could also use a protocol like HLS. But since we want the latency to be low, if you ask me a question in chat, I should be able to immediately see it, which is why, you know, even in our call right now, we're most probably using WebRTC.

// These are the common examples. This is a live video where we've implemented everything from scratch. We're just learning the same thing in a more toned down fashion today. Let's understand some WebRTC jargon. You don't need to, as I said, a lot of these things, if you don't understand, it is fine.

// But if you have an interview, if you're going for an interview for a video engineer, then you need to know these terms. There is a book called WebRTC for the Curious(https://webrtcforthecurious.com/) that, you know, deep dives into all of these. So if you want to really learn it for an interview, go here. Generally though, you know, if you just want to create a video application, even the most scalable video application, you can do it without, you know, understanding a lot of these things. Number one, WebRTC is a *peer to peer protocol.

// Note
// This is an important thing. When WebRTC was built, it was built like this. Here two browsers will directly send each other media. This is the person who's producing the video and the other party who's receiving it. There is no server in the middle.

// It is going directly from here to here. This might sound very confusing because until now we have learned what we have learned about the client server architecture, where if you ever want to send data to even someone else, if this is person one or browser one, and this is browser two, if you ever want to send them any data, we have sort of created WebSocket servers. We have created HTTP servers. Never have we done here I am able to directly send data to the other side. We are able to connect in a peer to peer fashion, but WebRTC is that.

//(see pic 3) WebRTC was built for you to be able to send media directly to the other side. Why? Because video is very expensive. And you know, if you're relaying all the video through a server, the cost gets very high, very quickly with which is probably one reason. I'm sure there was another reason whoever created WebRTC, you know, thought of peer to peer as as the common architecture here.

// Note
// And so if the question ever asked you is, is WebRTC a peer to peer protocol? The answer is yes. Can you, without a server, talk to another site? Can you send your video directly from one browser to another? Yes.
// Harkir, how do I find the other browser? Is it also hosted on, you know, API.hundredxdevs.com? Is there some URL I can go to? How does browser one know where to send the video? That is a good question.

// Note:
// We'll be coming to that very soon. But the thing to know is, k, WebRTC is a peer to peer protocol.(see pic 4) This means that you can directly send media to the other person without the need of a central server. There is a call out here. You do need a central server for something else, but not for final media communication.
// This is why you might have heard, okay, you know, ninja, who's a famous YouTuber, Ninja's location got leaked because he was on Omegle. Why? Because if this was Ninja's machine browser, Ninja browser, for those of you who don't know, he's a streamer on Twitch or something. And you know, he was directly sending his video to someone random on Omegle. So other person.
// And since the other person was receiving the media directly from here, he could sort of figure out the IP of Ninja. And since he was able to find the IP of Ninja, he sort of was able to find the location. So this is why people say it's a little insecure also to do this. And, you know, whenever you're on Omegle, people can a lot of times find your location because they can find your IP. Why can they find your IP here?
// Because you are directly sending them media. So they can inspect where is the media coming from and find the actual IP. The same doesn't happen. If you have a server in the middle, if two people are communicating through a server, both the parties only know the location of the server. Neither of the party knows each other's location.

// So that is what peer to peer over here means. We will eventually see how you can, you know, see the other side's IP as well. And, you know, if you ever want to hack, basically, if you're on Omegle and want to fool someone, you can find their IP and how that's very, very easy to do. Let me quick give a quick brief of where you should go. You should go here to do that in case I forget.

// You can go here and find the IP of the other person. Now I'm going to contradict myself a little bit.(see pic 5) You actually do need a server. You don't need it for media communication, but you need it to tell the other side, this is my IP address. As I said, since Ninja was sending the, let's say Ninja needs to send the video to the other side and vice versa, it's a two way call.

// So both the parties are sending each other video. They need to know the location of the other person. It's like knowing their address. Where do you reside? Where should I be sending all of my video packets?

// So before they even create a connection, when two people come on a website and they want to, you know, talk to each other, they first need to exchange their address. Now, what does address mean here? We'll get to very soon, but they, since they need to both send each other something first before they can connect it directly to each other, we do need a central server. If you don't want a central server, you can also, you know, write your IP on a piece of paper and give it to your friend and, or mail it to your friend. Your friend will receive it and then, you know, they can write their IP and mail it to you.

// Doesn't matter. The point is both parties first need to exchange something and a server, an HTTP server, a WebSocket server is just a easy way to do it or the most popular way to do it. Here before they are able to connect to each other, let's say you want to, talk to your friend. You need to know their phone number, right? Let's say you don't have their phone number.

// What will you do? You will probably mail them. Okay. Hey, what is your phone number? And they will revert back with their phone number.

// Note
// And then can you actually call them? So this process is just sharing your phone number with each other, telling each other, okay, hey, I, this is my IP 19219123, let's say. And the other party is saying, hey, this is my IP 191 some random number. Exchanging this through a server and then you can just kill the server. Once this exchange has happened, you don't need the server anymore.

// You stop the server. Still both the parties will be able to communicate with each other because they have once exchanged their address with each other. This server that signals to each the side their address, it actually signals a bunch of other things as well. I'm just keeping it simple here. The thing that's exchanges the IP, they exchange a bunch of other things.

// This server is called a signaling server. So is WebRTC a P2P protocol? Yes. Do people directly talk to each other? Yes.

// Do you need a server in the middle? Yes. You still need a server. Why? To exchange the IPs, to let both the parties know, k, hey, this is my address.

// This is my address. Now let's create a connection. Let's call each other and, you know, we can send each other data directly. Now we don't need the server, but initially we do. So for bootstrapping your WebRTC call, you need a signaling server.

// STUN : (s p 6)
// That is what signaling server is. Third jargon to learn is something called STUN, which stands for session transversal utilities for NAT. Maybe before that you should understand what NAT is. How many of you have done a computer network class Just to I mean, we won't be diving deep into this, but do you know what NAT is? Do you understand network address translation?

// Fifty fifty. No, actually, like 70%. No. 65% no. Yeah.

// So basically there are limited IPs in the world, and you know, you don't need to know this. If you don't know this, it's fine. But basically, whenever you if let's say I go to what's my public IP, it It says, Akhir, your public IP is 15212790. It is this. But a lot of people might have this public IP.

// If I am currently in a hotel(s p 7), you know, all of us in the hotel will most probably have the same 192 dot whatever that IP was, one dot. This is our public IP for a lot of people in this hotel. And we have a router basically that we're all connected to. So So I actually go through a router, which probably is a router of the hotel, and so does another party, and so does another party. And network address translation, NAT stands for publicly told everyone for every person.

// This is the IP, but this IP is for this person also, this person also, this person also. So whenever I try to create a connection,(s p 8) this router knows kya the connection that was made on port 55991 was for Urvish. So if someone tries to connect to this IP colon 55991(s p 9), send it to Urvish. And similarly, if you know a different connection was made on a different port(s p 10), if there is an incoming connection that comes here, send it over here.
//  So basically NAT lets you drill down IP addresses.
// Note :
// There are limited IP addresses in the world, and you know, there might be a router that a lot of people in this hotel are connected to that has a public IP and it internally maintains an address table, gets at this specific IP, you know, or this specific port specifically in case of WebRTC. This specific port is being accessed by this machine, and this specific port is being accessed by this machine. If there's any incoming data on this port, send it here, send it here, send it here. That's a brief about NAT, and, you know, why WebRTC discovery becomes complicated. Why does WebRTC discovery become complicated?

// What does even WebRTC discovery mean? I mean, if I am trying to send my video to someone now, that other party will get what? They will get my public address, whatever this address was when I opened the website, they will get this public address. When they try to send me media, it needs to go to me and not to other people, which is why, you know, this sort of becomes important, because a lot of people will have the same public IP.(s p 6) Stun specifically gives you back your publicly accessible IPs.

// STUN server
// It shows how the world sees you. Basically I went to this website right now, right, whatsmyip.com and it showed me my IP. Similarly, what if I did not have to go to a website? What if I could go to some other server, which is usually called a STUN server and ask it, hey, how do you see me? I just sent you a small request.

//(s p 11) Can you tell me what IP you received it from? And then the STUN server can respond back with, hey, this is your, this is where your request came from, from this specific IP and this specific port. That is what a STUN server is used for. Why do we need it in WebRTC? Because before I tell the signaling server, before I tell the signaling server, okay, hey, this is my address.

// But why STURN server
// I myself need to know it. Right? I myself need to know, okay, hey, what is my address? And then I can tell the signaling server, this is my address. Please discover me here.
// Then it can forward it to the other side. You might ask, why can't the signaling server itself figure out what my address is? That is a good question. And the answer is the signaling servers is not able to get all the addresses of a machine. Every machine has multiple addresses.
// As I said, this machine probably has a private address as well. Something like 172.10.330.4. And all of these machines inside the hotel can talk to each other with this private address. But if this person outside on the internet, somewhere in The US tries to connect to this private address, it won't be able to reach me. So every machine has multiple addresses it can be addressed from, or it can be reached from.
// My next person room number can reach me on 172.10.330.4, which is like a private IP address. But if someone from The U S needs to receive or send me data, they need to send me data here(s p 12). You need all of these candidates. These are called ICE candidates. You need all of these candidates and a STUN server sort of pulls all of these out for you.

// A good way to test your own ICE candidates is go to this website, which is a commonly used website(s p 13) for WebRTC debugging. The title says, trickle ICE. It basically will trickle all your ICE candidates to you. It'll send you back all of your ICE candidates. Google has a very famous STUN server that they've given out for free.

// So anyone all around the world can just connect to this STUN server. This is the address for it, stun:stun.l.google.com:19302. This is the address of what server? The address of a STUN server that's publicly available. Because it's such a cheap thing to do, Google gives it out for free.

// You can also create your own. You can also use someone else's. This is the one STUN server I've put. If I click on gather candidates here(see pic 14), it will show me two candidates. If you remember, this was my public IP (s p 15).

// It is saying, 1.520.1270.9. This is one address port combination you will receive data from. If anyone sends data to this IP, this address, you will receive it. If anyone sends data to this very weird looking address and port, then also you will receive it. These are my two candidates that I can now send to the other side, that I can now send through the signaling server to the other side.

// Okay. Hey, this is where you can find me. And that is what a TUN server does. We'll take a pause here because I think I've said a few things together, but let me recap everything.
// 
// 
//  How does a WebRTC call happen?

// Number one, you go to a STUN server and ask for your ICE candidates. What are ICE candidates? A bunch of IP port combinations on which you can be discovered, on which people can send data to you. Then you tell a signaling server, a node JS WebSocket server, a node JS HTTP server, these are my ICE candidates.(sp 6) Other people can find me here.

// Please send it to my friend over here so so that they can directly connect to me. Browser two does the same thing. It hits the stun server, gets back its IP port combinations and sends it to the signaling server, which sends it here. Now both the sides know the address of each other. Both the sides can find each other on the internet and exchange media.

// That is how the peer to peer connection is made. Now, if you even kill the *stand server, you kill the *singling server, doesn't matter. Both the parties have exchanged their IP ports. They can directly send each other media. That's a brief of initiation of a call.

// QNA

// There are a few things that come afterwards, as in how do you send video, but do we understand this much? Do we at least understand STUN, signaling and peer to peer? Sort of. 81%. Let me look at q and a for just three more minutes, and then we will proceed.

// Let's see what it says. Can we use WebRTC and WebSockets in a single project? Yes, you can. Only people connected to the same public IP can talk to each other. Private IP.

// How are multiple ICE candidates? Recap that, please. So there are multiple ICE candidates, as you can see, you know, there are two, this one and this one. This one is my localized candidate. If I go to my terminal and if I type, oh, if I type ping this specific address, you will see it gets translated to 172.8.2.252.(sp 15) fist one this private ip and second is public
// This is a private address. Anything that starts with 172 or 192 is a private address. This is for everyone in my hotel so that they can directly send me media here. They don't have to go through the internet. This is a smaller private key that I can share with everyone in the hotel.
// If I try to, you know, open my WebRTC call on my phone, on the same hotel wifi as my distinct, then this will be the chosen ICE candidate. But if this fails, then WebRTC will fall back to this guy. This tool did not work. Let me try this ICE candidate. And since this store is on the internet, this will work. So that's how you choose. That's how WebRTC chooses.

//  Do stand send all your ICE candidates to signaling server or only the public ones. It sends all the ICE candidates, but not to the signaling server. It sends it back to you.

// It is your job to forward those ICE candidates to the signaling server. Did not understand why signaling server can't identify the ICE candidates because that's not a protocol. You can actually do it. This is, there are discussions here in companies here. We should do it directly on the signaling server.

// STUN as a protocol pulls out the ICE candidates. So you will have to start a STUN server here. That's all. If you do that, yes, sure. You can, you know, directly pull out ICE candidates here.

// Most of the time signaling servers are HTTP servers or WebSocket servers. So they don't have that protocol running, the STUN protocol. But if you do run it, then sure you can do it in the same place. What is STUP? No idea.



// Recap,
//  recap, recap, recap, recap. Okay. Quick recap. Let's say you want to call a friend. Let's say you want to call a friend.
// How will you call them? You will number one, ask Airtel, Hey, what is my number? Sorry. I forget. I forgot.
// And Airtel will tell you, hey, Acharya, you are Hakirath. There you go. Your number was this (706) 033-3333. Then you will be like, okay, I need to send my number to my friend to let me post this number where, you know, either Gmail or physical post to my friend. It reaches your friend on the other side.
// Now, your friend has your number, and then your friend does the same thing. Your friend asks Ethel, hey, what is my number? And then Airtel tells him, bro, you got a SIM from us a few days ago. Your number is (706) 044-4444. And then this guy says, here, I should probably send back my number to my friend as well.
// Let me post it over here and send it here. Now both the parties have each other's number. They can directly call each other. Even if the Airtel service is down now, it is fine. The number has been exchanged.
// Even if the postal service is down, it is fine. The number has been exchanged between both the parties. That is one way you would call your friend. 


// 
// And similarly, in case of WebRTC, number one, you ask a STUN server. Hey, can you tell me where did you receive the request from?

// You, I'm sending you you a request. Just tell me if you received it from a public IP, a public, a private IP, send me all of that information. You get that information back and then you, the browser itself forwards that information to Forget Signaling, a simple WebSocket server. These are my candidates. Please send it to the other side.
// This is my phone number. Please send it to Harkirath. You might know Harkirath's address because he's also connected to you from a WebSocket's connection. You forward it to the other party. Other party does the same thing, asks for their address, forwards it to you.
// Now you both have each other's address. You can start sending media to each other. That is what stun signaling and peer to peer means. Hopefully, that is clear now. This is the finalized candidate that I saw on my side.

// You should try to create your own. You'll probably see something similar. Let me go through the rest of them and then we'll do another poll and if needed happy to, you know, because this is a slide that will take most of the time after this is just coding.
// 
// 
// 
//  ICE candidates.(sp 16) I discussed this a little bit here.

// (sp 15)These are my candidates for other people to connect to me. Now they will try from the first one because you know, that's the easiest one over here. They also, you know, some sort of priority. For example, I think here one twenty six means this has higher priority. And I think the higher the priority number, the lower the actual priority, something like this.
// But basically, yeah, you always attach a number to an ICE candidate as well. So the other side will first try to connect with the higher priority ICE candidate. And if that fails, it'll move to the lower priority ICE candidate, so on and so forth. It'll try each and every ICE candidate of yours until it is able to create a connection. Herkias, what if it is not able to create a connection, totally possible, then it just fails.
// Like the WebRTC protocol sort of tells you, in an object connection failed or something like that. 


// What are ICE candidates?(from sp 16)
// 
//  Our potential networking endpoints that WebRTC uses to establish a connection between peers. Each candidate represents a possible method for two peers to communicate. Usually in the context of a real time application like video call.
// Each candidate represents a possible method for two devices to communicate. Two devices might communicate from the first one, might from the second one based on, you know, how close they are. 
// If I open literally two tabs on my machine, then they can connect through a third candidate as well. 127001. They can discover each other directly on the local IP as well.
// So, you know, depends on how far the other person is from you. If they're in your same network, they'll probably use a closer ICE candidate. If they're on a very far network, then sure, you know, they'll use your public IP to reach you. If two friends are trying to connect to each other in a hostel wifi, then they can connect to their private router, ISE setup candidates. If two people from different countries are trying, then they will most probably connect via this public IP address.
// That is what a ISE candidate is, sort of discussed this, you know, in the last point as well. Two small things after this three, maybe turn server offer answer SDP four. Yeah. A lot of things. Okay.

// Let's understand turn server. (sp 17)
// 
// Even if you don't understand this, this is fine. But a lot of times your network doesn't allow media to come from browser two. Even though you guys have changed your numbers with each other, if you try to send each other data, it won't happen. Why Harkirath?

// There are a lot of reasons. One big reason I can already tell you is k, you know, when you hit the STUN server(sp 6) and you're, you got back this specific IP port combination, your router expected data to come from this STUN server. But if you share this candidate with another friend and they send you data, your router blocks it. Your router is like, no, this data was supposed to come from the STUN server. This candidate was shared with the STUN server.

// Why is this data coming from The US? This data that was, you know, should come from wherever the STUN server is, let's say India. So depending on how restrictive of a NAT you have, how restricted of a network address translation you have, your router might block incoming requests. So you might not be able to directly connect to the other side, which is where a turn server comes into the picture. 
// 
// 
// What is a turn server? (sp 17)

// It basically gives you a bunch of extra candidates. If I, along with this turn server here, add another turn server(sp 18), which how do we create a turn server? We we can eventually discuss or, you know, we don't need to say, because you don't need turn servers for 95% of the calls. For 5% of the calls, you have to fall back to a turn server. But basically the way to introduce a turn server is as simple as deploying a turn server and then adding an address here.

// And then when you click on gather candidates, you will see a bunch of turn server candidates here as well. So the other party, the other side, basically, this is your TURN server. The name itself says TURN because it sort of turns media around. And you know, two people that are trying to directly connect to each other, they have each other's candidates. Let's say, you know, 1.5.2.3 and then some private address like this 172.1.1.1.

// They will also have a third address, which will be, you know, the address of this TURN server. Let's say this TURN server is deployed on AWS, and its address is some 5 5 5 Five. They will also get a third address. If none of these work, then here is a third turn candidate. Just send data to this guy. (sp 20)

// I will receive data from it. Now it's no longer peer to peer. It's getting turned through a server, but there is nothing you can do because your network is very restrictive. It is not allowing the other party to send data. So what is a turn server?

// It is a fallback when you are not directly able to talk between machines. For 95% of the calls, it will work. For 5% of the calls, people are in restrictive networks. If everyone, you know, is in a college that does not, that has a very restricted NAT. NAT also has types.
// Like if you really go through the NAT protocol, it has like a bunch of types. I totally forgot the names, but, you know, strict NAT, blues NAT, something like that. And even if the if you have the most strict version of NAT in your college, campus, then, you know, you will most probably fall back to a TURN server. You will not be able to directly communicate with the other side. That is what a TURN server is.

// Do we need it today? No. Do we need it usually? Yes. You should have a TURN server.

// And it's as easy as just, you know, whenever you're creating the WebRTC connection, along with this TURN server, you specify another TURN server and you're good to go. You don't need to do anything fancy. Everything else just works. You just have to introduce it in one place. Offer an answer.

// (sp 21)
// These are terms that, you know, just WebRTC terms. 
// 

// Offer
// It just means the process of the first browser sending their ICE candidates to the other side is called an offer, 
// 
// which basically means if you know, two parties are trying to communicate after they have gotten their ICE candidates, the party that initiates the connection, The party that is the first one to tell the central server, k, hey, I want to create a connection, here is my ICE candidate, creates an offer. It is offering a connection.(sp 22) The other side receives the offer(sp 23) and creates an answer(sp 24) and responds back(sp 25), hey, here is my ICE candidates. So these are just terms, but, you know, come up, will come up eventually.

// So I introduce them here.

//  What are the two terms? Offer and answer. The party that is initiating the connection creates an offer. The party that is responding back creates an answer.

// Harkeyed, how do we know which party initiates, which party responds back? The answer is usually the party that is sending the media, which means sending the video or the audio, initiates the offer. The party that is receiving it initiates the answer. 
// 
// Harkeyed, what if both the parties are sending data? Then you create two WebRTC connections.

// I repeat, if if you'll have if you have a one side communication, which means, you know, you have a cricket match. This is a cricket server that is just sending data to the other side. Data is going from here to here.(sp 26) Nothing is coming back from here to here. In this case, this guy will create an offer.
// This guy will create the answer. But if both the parties have to exchange, you have to create two web RTC connections. First one will have the offer of over here and answer over here. Second one will have the offer over here and the answer over here. So what have we learned?

// We've learned one very important concept in WebRTC or it is less of a concept. You can still do a single webRTC connection and share data from both the sites. But usually, you create two WebRTC connections if both the sides want to send data. So there are two people sending each other data, there will be two WebSocket connections. Oh, sorry WebRTC connections.
// And, you know, this will be the offer for the first one. This will be the offer side for the second one. This one probably went over some people's head, maybe not for other people.
//
//  But today the implementation we're doing is one to one, one way, which means, you know, one party sending, one party is receiving. So we don't have to worry too much about two WebRTC connections.

// The thing that we did in the live stream on YouTube, we had two WebRTC connections there. And, you know, both the sites pretty much had basically if you open about colon WebRTC, you saw a bunch of boxes here. Not just one because, you know, there wasn't a single connection. There were two connections. So you saw a bunch of things here.

// If you go to the live stream, you'll see it. But let me not go there. Alright. I feel like this is a lot of theoretical stuff and you know, some of it might be going over your head, which is fine. I will recap everything from top to bottom before we proceed to the next slide.

// Let's do two more things. 
// SDP, session description protocol, (sp 27)
//  and RTC, peer connection, (sp 28)
// 


// SDP, session description protocol, (sp 27)
// and then we're good to go. Then I will summarize everything and we'll go from there. SDP session description protocol is actually the thing that both the parties share. I lied to you a little bit.

// I said both parties share the ICE candidates. They do share the ICE candidates. If you look at the SDP in the end, it has, if you look at a small one here, it has four candidates here. Here I am available on this IP to support this IP to support this IP to support so on and so forth. So it does have the ISE candidates(sp 29).
// It also has a bunch of other things.
//  I am sending you audio. I am using RTP as the protocol.
//  This is the IP address it might be coming from so on and so forth. SDPs are very hard to read.

// And if you're going for a very senior role, then you have to, you know, understand it top to bottom. Most of the times it is fine. But the sections that an SDP has, the important ones are the candidates that you're sending to the other side. Okay. Hey, you can discover me here.
// And what media you're sending? Are you sending audio? Are you sending video? Are you sending two videos? Because currently, as you can see, I'm sharing my screen also.
// I'm sharing my camera also. I'm sharing my audio also. So for my SDP, I will have two video sections like this(sp 30) and one audio section like this. So very long, very complicated sort of a text that you send to the other side. You never send ICE candidates.
// I kept on saying, k, you know, you share the ICE candidate from the other side between two sides. But what you really share is a very long file called the SDP. This is the signaling server. After you've gotten your ICE candidates from the stun server. You get your ICE candidates from here.

// Then you send what to the signaling server? You send an SDP(sp 31). You do not send your ICE candidates. You send your SDP. The SDP, of course, has your ICE candidates.
// The SDP reaches the other side. It creates an answer. The answer also is an SDP. You get it back and then, you know, then you can talk to each other.
// 
//  So what does SDP stand for?
// Session description protocol. It is a description of your session. And what does it contain? It contains a bunch of things. The important ones being your ICE candidates, what media you want to send, what protocols are you using to encode the media, to decode the media.

// What do I mean by protocols? You might have heard of h dot two six four or a v one. Maybe you've heard of it, maybe not. But you know, whenever you're sending video to the other side, you don't send 30 frames. Okay.

// Every one second here. There you go. This was frame one. This was frame two. This was frame three.

// You send encoded data. There are some very nice protocols out there that, you know, make video transfer much more compressed by just sharing the diff. If there is some diff between frame one and frame two, that diff goes to the other side rather than, you know, 30 frames one by one going to the other side. So telling what specific protocol you're using is also, you know, shoved over here. That is what an SDP is.

// Do you ever open an SDP? 
// You do when you have to do very hard core debugging. If you, you know, are not able to see video from the other side, then you open this and try to figure out what's wrong. Most cases, you are fine. 


// Lastly, RTC Peer Connection. (sp 28)

//(sp 32) This is very similar to how we have used Fetch in the past. We have used WebSocket in the past. This lets you send an HTTP request to the other side. This lets you initiate a WebSocket connection with a WebSocket server. The thing that we're learning today is PeerConnection object or RTC peer connection object.

// (sp 33)This is a class that lets you, you know, basically create a bunch of WebRTC things, create an offer, create an answer, get your eyes cendidates, everything. This is your variable in the browser that hides a lot of the complexity from you. And, you know, simply gives you back the offer that you can send to the other side, simply gives you back the answer that you can send to the other side, so on and so forth. You don't have to worry about writing the protocol yourself. Very similar to, we never worried about, you know, writing the WebSocket client ourselves.(sp 34)

// We just got it in a variable here. Similarly, we get this in a variable as well. Alright. Let's do a quick check before we move on to the code. This should be slightly easy to understand when we reach the code.

// But, yeah, how are we doing? So in forty five minutes, so we should also take a break at some point. Doing pretty good. Okay. 75%.

// That is fine. Let's answer some questions for fifteen minutes and then we will move on to the coding bit. The next slide is the, yeah, next slide onwards, we're just going through the implementation, writing some code. If you want to directly look at the code, try it out locally. The code is already deployed, not deployed. 

// It's present here on this GitHub repository. Let me paste it in chat. So if you want to just read through the code, understand it yourself, feel free to, if you want to do it with me, just wait for some time. Let's do fifteen minutes of Q and A and then we'll go from there.
// 
// 


// QNA
// 
//  I'm opening the Q and A section and reading things from there.

// Go to the bottom here. Are turn servers and turn servers the same? If not, then how are the browsers allows the turn server? The second browser is not allowed. TURN servers and SON servers are not the same.
// If not, then how does the browser allow TURN server if second browser is not allowed? Oh, great question. Well, great question. Someone said, Halkid, you said this is the TURN server and you know, this is your browser one and this is your browser two. You said, k, you need the turn server because browser two stops incoming data from here.
// But then why does it not stop incoming data from the turn server? And the answer is browser one got the candidate itself from this turn server. If you remember, I said in this specific website, you can put a list of stun servers. You can also put turn servers here, which means the ice candidate that you get back is from the turn server. And if the media is also coming from the turn server, then it won't be blocked.

// Inmortant Note: about turn server
// Right? The reason for the *block happens, can you get your ice candidate from the stun server, but receive data from the browser. So your router is like, yeah, this specific port was opened for the stun server. Why is the media coming from here? But if you got your ice candidate itself from the turn server and the media is also coming from here, then why would the router stop?
// Router was like, okay, wherever the, whatever I created the initial candidate for, I'm receiving the data from the same place. So that is good to go. That is why turn works and, you know, stun doesn't. 
// 
// 
// 
// 
// 
// Does WebRTC only use for peer to peer one on call? Then which protocol is for group call?

// Still WebRTC, but you use a different architecture called SFU, which is discussed in the last slide. 
// 


// Why is the protocol UDP while getting eye scanning on the server?
// 
//  Because UDP is the most popular protocol to do video communication. Right? If you want to send data to the other side, you would want to send it using UDP.

// You can force TCP as well. This This specific website doesn't(sp 35), but, you know, I can create a turn server that restricts with just TCP connections. You can do WebRTC over both UDP and TCP, but you prefer UDP because, you know, video may UDP makes a lot more sense. Even if data gets lost, it's fine. You'll just see a chop and then, you know, everything would be fine.

// Does turn server become expensive? You said media on server expensive. I said media on server is expensive. Does turn server, in what context? So, to answer your question, you can't do anything about it.
// Turn server, even if it gets expensive, there's nothing you can do. To answer your second question, I said median, so it does become expensive, but you know, it's only 5% of your traffic, so you should be fine. When I said median server becomes expensive, I meant, you know, if this is an EC2 machine, the bandwidth that an EC2 machine(sp 36), the bandwidth cost of an EC2 machine is really high. You get free bandwidth for, you know, 10 gigabytes 100 gigabytes something like that, which is okay for websites. But if you start to send media over an EC2 server rate is when it gets very expensive.

// And that will happen. There's nothing you can do about it. Unfortunately, it turns over, you know, deployed on digital ocean. Digital ocean has cheaper bandwidth costs and, you know, doesn't matter since only 5% of the people are using it, use a cheaper cloud. 
// 


// Two offers means that two web RTC connections over two different ISE candidates.
// That is correct. So we need two ISE candidates from the two way communication. Yes. You'll ask for one set of, basically assume this. I click on this.

// I get my first ICE candidate. I create one connection. And then when the other side sends me an offer, then also I click on this. I get another fresh ICE candidate. As you can see, the port changed.

// And then I send the other ICE candidate to the other side. 
// 


// Note: important
// Reshare screen. Time to reshare screen. Does WebR do okay. So that In case of current Zoom calls, suppose 500 students are live.
// So there are 500 WebRTC connections. So when you're using Zoom, you are most probably using something called an SFU. So if this is Harkirath, Harkirath is actually sending his data to a server, a Zoom SFU.(see ouc 37) And then this SFU is most probably sending data to another SFU. This is what a distributed SFU is.

// And then, you know, you guys are all 500 people are receiving data from these, three servers basically. And if the number becomes a thousand, a thousand people join, then they will just add another server that this SFU will forward my video to, which will forward the video further to more people. Now what is an SFU we'll get to eventually? 
// But for calls with more than five people have joined, peer to peer does not work. In current call, for example, 500 people have joined.

// Peer to peer will not work because then Harkit will have to send video to 500 people. My hotel WiFi cannot handle that. I cannot have 500. My CPU also cannot handle that that in, you know, sending, pushing out so much data. So in case of a call where there are more than five people, peer to peer does not work.

// We choose a different architecture, which we'll get to in the last slide. But yeah, that's the answer to your question. What if one person is connected with VPN? The other person will see that the first person. They will see VPN.
// That is correct. How does WebRTC work when you okay. Same question. If you have a VPN, the world discovers you a different way and you, you know, get your VPN IP and all the data also gets routed from there.
// 
// 

//  Does Zoom use WebRTC as well?(sp 37)
// How does it protect the IP information? SFU. If you have a server in the middle, you will get this address of the server, this server, this server. You will not get Harkir's direct IP. It gets hidden in this central server, which is why I said, you know, Zoom, every other call has a different architecture where this isn't a problem.

// Should we not learn RTC if we don't want to go for RTC in a job? Should we fine? WebRTC? You mean webRTC? Yeah.


// Yeah. Unless yeah. Yeah. Probably not. Why do you need TURN server?
// Repeat, please. Sure. TURN server says, I did sort of share some. Okay. Browser one, browser two, stun server, signaling server.
// I asked the stun server, hey, what is my IP? STUN server says your IP is 12345555. I tell the other side, this is my IP. The other side gets my IP. The other side tries to send me data, but my router over here blocks it.
// My router says, yeah, this specific port was opened for the STUN server, not for a browser two. I will not let media from browser two in. And hence, you use a TURN server. You ask the TURN server what's my IP? TURN server returns you some IP.
// You send it to the other side. And this IP is now the IP of the turn server, which means the other side is now going to produce media to the turn server. And this media will come to me from the turn server. Now the router won't block it because the router is like, okay, I opened this specific port for the turn server, and this is where the media is coming from. So when you have very restricted networks is when direct peer to peer connection will fail and you will have to send data through a turn server.


// WhatsApp video call, my picture, that depends. Most probably I would assume, I don't know. I don't know if they have a peer to peer. We can confirm it if, you know, WhatsApp opens over here and then, you know, you and I come on a call and I go to about colon WebRTC. And if I I can see your IP, that means they don't.


// I don't know if they use if they do peer to peer or if they do SFU, probably do peer to peer. I've thought of this once. I think they do peer to peer. I could be wrong, which means, you know, there's IP can be fetched. Yeah.

// Okay. This is a bunch of questions unrelated to WebRTC, so I'll cover at the end. Let me do a quick recap from top and then we'll go from there. WebRTC is a peer to peer protocol. What does that mean?

// RECAP
// If there are two browsers, they directly send each other data or video in this case. You don't need a central server after the connection between the two browsers has been made. But before the connection is made, both the parties need to exchange their addresses with each other, exchange their ICE candidates with each other, exchange where can the other party send the media, which is what is happening over here. That's what a signaling server lets you do. It's not something special.
// Signaling server is just a simple WebSocket server or an HTTP server that you create that takes the SBB from one side and sends it to the other side, takes the SBB from here, sends it to the original side. STUN is a server that you hit to get your ICE candidates so that you can tell the other side, hey, discover me here. That is what a STUN protocol lets you do or a STUN server lets you do. We were using the free STUN server by Google. You can create your own to get, you know, more set of, candidates.
// And when I tried locally, I get two candidates, one a local candidate and one, you know, a more publicly available candidate. If you and I currently go on a WebRTC call, then most probably we'll be hitting this specific other IP. That's where you'll be sending me my media. ICE candidates, basically all of these candidates that the TURN server tells you that you can receive media on are called ICE candidates. And lastly, a TURN server, which if you don't understand the deep details of it, the high level is for some reason from time to time a peer to peer connection cannot be made.

// What is that reason? Short answer is restricted network or restricted NAT. But long answer, you know, it's fine. Even if you don't understand that, it's fine. The goal the goal is to understand why do you need a TURN server.

// The answer is sometimes peer to peer connections cannot be made. When they cannot be made, you relay media through a turn server. And yes, this does get expensive, even though less than 3%, you know, 5% at max of your audience comes through a turn server. The bandwidth costs for, you know, media to go through an EC2 server are really high. The bandwidth cost for a website, if you go to app.hudexams.com, you just ask for an HTML file from an EC2 server.

// That is fine. But if you make media go through an EC two server, that gets very expensive, which is why, you know, turn servers are expensive, but what will you do? There's nothing you can do about it. Most of the time, this is your cost also. This is your only cost.

// Why? Because singling server, you can put on a small machine and all the media communication is happening peer to peer. So that's why WebRTC is actually a fairly cheap protocol. If you're doing it this way, you only have to pay for, you know, TURN servers. This remains the only expense if you ever have, you know, an application that has peer to peer WebRTC.

// Lastly, we discussed SDP, which is, you know, the actual thing that gets exchanged between both the parties. It's a very long file, which if you don't understand it, even I don't understand it, was asked in an interview failed. This specific file is very hard to understand, you know, unless you really want to understand the core of WebRTC. I would say, you know, you can count the number of people on fingers who understand this very well. And but if you want to understand from a high level, what does it have?

// It has all your information. K. This is the media that you want to send. These are the ICE candidates for the other side. And that's how the both the sides know that this data is coming.

// I have a video coming over here and, I might have an audio coming from the other side. And this is where I should try to connect to the other side. And lastly,
// 
//  RPC peer connection is going to be your savior because everything that we have learned, you can almost ignore if you, you know because all of that complexity gets hidden behind this real time communication peer connection object. It's also called PC from time to time or, you know, PC is the variable that you use for it or peer connection. Basically is a class that lets you, you know, start a WebRTC connection from one side, gather ISK candidates, create an offer, send it you send it to the other side by WebRTC, get back the answer, send it to the peer connection object and, you know, you get back a video track.

// To summarize, you need a singling server, a STUN server to initiate a WebRTC connection between the parties. You can kill these once the connection is made. Once they are able to discover each other, you can kill the STUN server and the signaling server. You need to include a TURN server in case any of the users on a restrictive network so they can fall back to a TURN ICE candidate as well. What is a TURN server?

// You can, you know, there are very fairly common open source TURN servers available. For example, Kotern(sp 38 ). So this is an open source TURN server. You can just deploy this on your e c two machine. You can just put your address of your e c two machine here(sp 39).

// And when you click on gather candidates after that, along with these two candidates, you will get a third candidate, which is your IP of the AWS machine where you deployed. And if this fails and this fails, the data gets relayed to the third candidate, which is the turn candidate, which will send your data through a turn server. That is a brief of all we have discussed until now. Next up, we are going to get into the code, but let me see how we're doing before we proceed. We're at 09:30.

// Okay. Pretty good. 91% is great. Let's get coding guys. Now this slide summarizes everything that needs to be done.


// Now let' do code - (sp 40)
// If you want to codify this, let's go over this. Even if you don't understand it, it's fine. Next slide, we will actually code it. The things that you have to do, the steps that you have to take include number one, browser one creates an RTC peer connection(sp 40). Just how, you know, as I said, you send a fetch request, send a WebSocket connection, you create, you use the WebSocket construct that browser provides you.

// Similarly, you can do something like this const PC equal to new peer(sp 41), sorry, RTC peer connection. When you do this, when you run this line of call, a p a WebRTC object is created. The connection isn't made yet. I haven't created an offer. I haven't yet gotten my ICE candidates, but something has started.

// If I go to about colon WebRTC now (chrome://webrtc-internals/), you will see it says projects.hanidexsteps.com has some WebRTC connection created(sp 42). It's still in the new state(sp 42 new hilighted). It isn't yet connected, but the person created a peer connection. If I create another one, const p c two(sp 43), then you will see two of them. So anytime you create a peer connection object, means you have initiated or at least you're going to try to initiate a WebRTC connection with some other site.

// You haven't done it yet. We haven't done anything yet, but at least you have started. And that is exactly what these stats are telling you(sp 44). Okay? You have created two WebRTC connections.

// The state for them is still new. ICE connection state is still new(sp 45). It isn't yet connected, which means both the parties haven't connected yet because we haven't done the steps that we are supposed to do from here. What are the next steps? 
// Browser one creates an offer. (sp 46)

// How do you do that? It's pretty simple actually. The PC that you had created oh, g d d. Sorry about that. What had I done?

// Const PC equal to new RT CPR connection, something like this. You can create an offer by doing PC.create offer. It actually returns a promise, so I can basically do something like this. Const offer equal to await PC.create offer. And if I log the offer here, you will see it has an SDP(sp 46), v equal to zero in IP 41270.20.1, a bunch of things.(see pic 47)

// This specific thing, it doesn't have any ice candidate yet(see pic 47). We'll get to why. But that's how you create an offer. You create an initial SDP that you will send to the other side. So So what is step one and step two?

// Create an RTC connection object. Create an offer. Set the local description to be offer(sp 48). This is one extra step that needs to happen. K.

// Anytime you create an offer, you do this. You also have to do p c dot set local description to be offer(sp 48). This is you telling PeerConnection, k, hey, this is my current state.
//  This is what my current local SDP looks like. You might ask why if offer was created on PC,
// 
//  why can't we by default or why doesn't WebRTC by default call set local description?* (ans - TO set letest SDP)

// The answer is it doesn't. It expects you
// 
// !) whenever the local offer changes, you should explicitly set it by calling this. And 
// 2) whenever the remote answer changes,(sp 49) if the other side sends you an SDP, then also you should do a p c dot set remote description(sp 49) with whatever the other party sent you. We haven't other party hasn't sent us anything yet, but, you know, these are two common functions that you call on the peer connection object.
// 
// 
// 
// 
//  Start from the top. (sp 51 as reference)

// Browser one creates a RTC peer connection. Browser one creates an offer. Browser one sends the local descreption to the offer and it sends it to the other side. This is my offer. Browser two receives the offer from the signaling server.

// Browser two sets the remote description to the offer. So browser two also creates its own RTC peer connection. It sets the remote description to be that offer. It creates an answer(sp 50). How will the other side create an answer?

// It calls p c dot create answer basically(sp 52). It won't happen here because, you know, I already created an offer here, but it the other side calls p c dot create answer, gets its own SDP, returns it back, creates an answer, sets a local description, returns it back to the other side, and then the browser one sets the remote description. These are the steps. 
// 
// I feel like there are too textual in nature and not too descriptive in nature. Let's go through a diagram and understand them maybe.

// with diagram above process(sp 53)
// This is side one, browser one. This is side two, browser two. What does side one have to do? First it needs to create a const PC equal to new RTC PR connection. That's the first thing it has to do.
// Then it will say const offer equal to await PC dot create offer. It will create an SDP, and it will set its local description to be that SDP. It will be like p c dot set local description offer. This is my local description. This is my local SDP.
// You have to tell that to the peer connection object explicitly. Then it will send this offer over to the other side. This offer reaches the other side. And then the other side also does the same thing. It first creates a peer connection, and then it does a PC dot set remote description, set the description on the other side to be the offer.
// It says answer equal to await PC dot create answer. It creates a response STP. Here, you gave me your offer. Here is my answer to that offer. Here is my ICE candidates.

// Here also, you first have to set it locally, set local description to be the answer because my local description is my answer. My remote description, my other side's description is the offer that came in. And then I will send back to the other side my answer. And then the other side can simply do this p c dot set remote description to be the answer. These are actually the steps that happen.
// That's pretty much it. That's how you initiate a connection between two parties. We have to exchange some data. Of course the exchange happens through a WebSocket server or an HTTP server. But assuming that is a black box, assuming somehow this offer reaches this site and somehow this answer reaches this site, these are the steps that need to happen on both the browsers.

// I need to create a new peer connection. I need to initiate an offer, set my local description to be that offer, tell it to the other side. Other side needs to set the remote description to be the offer, create the answer for it, set the local description to be that answer and then return it to this side. This side will set the remote description to be the answer. How are we feeling?

// I feel like too many things happen too quickly here. But let's see. We can take it slow. Yeah. Totally fine.

// Let me open Q and A. Is it just let's do this again or is there some specific question recap. How does an initial offer send to browser two by browser one? Offer is sent through a WebSocket server, we'll get to that soon enough. Local description, can you please explain why we cannot do peer to peer for more than five people?

// We will come to that soon enough. We will have a slow recap, recap, recap, recap. Alrighty. How EdTech startups stream live classes in their web apps? Do they also use WebRTC?

// Unacademy does. No one else does. Only Unacademy has sort of built, you know, WebRTC based calls. Alright. Let's summarize this one more time.

// (see code in code 1 folder - https://jsfiddle.net/rainzhao/3L9sfsvf/)
// Maybe, you know, one more good thing to look at if you really want to look at any implementation. There is one example here. Let me paste it in chat as well which shows the same thing without a signaling server. It pretty much in the same browser creates a web creates two WebRTC connections, sends data from here to here in the same browser. If you look at the demo, I click on start, I give my camera access and video is going from this local video box to this video box through WebRTC.

// Might sound very weird, but the reason they have done it is so that, you know, there is no need for a signaling server here. You can simply have two peer connections in the same browser and, you know, send data from the same browser to the same browser. If I open my WebRTC console, if I go to about colon WebRTC internals, you will see JSFiddle has two WebRTC connections. Let me refresh this so they go away. It has two WebRTC connections (sp 54), one for sending data, one for receiving data.

// Note - about code
// So this is actually a very good smallest example to look at. If you don't want to have a signaling server and just send data from one browser to the same browser. Of course, this is not a great use case. I can just render two video boxes. I don't need to send the data from here to the to the same browser, but that is what they've done here.

// Look at the set of the events, created two peer connections. Ignore this. Ignore everything that is here. Ignore everything that is here. There you go.

// Notice this. This is probably the best example to look at. I have shrunk down the example to something smaller. What is it doing? It is initializing two RTC peer connections and that is, let me just open both of them side by side.

// (sp 55)
// It is this and then thing that I had written. Let's compare both the things. The thing that they had written and the thing that I have written. Alrighty. Where PC one equal to new RTC peer connection, that is this thing right here, the first thing that I had created in browser one.

// Then they say PC two equal to new RTC peer connection, that is this thing I've done over here. Let me keep marking them. So this is done in line number one. This is done in line number two for this example. Then what do they do?

// PC one dot create offer. Where is that happening? Await PC1. Create offer. I create an offer to send to the other side.

// That is what happening. Here, that is what happens in this line. Once that succeeds, I set my local description to be that offer, which is what is happening in this line of code. Then what do they do? They do a p c two dot set remote description to be this local description.

// They send this offer to the other side and do a p c two dot set remote description. That is what this line of code does. Then the other side creates an answer. They do a PC two dot create answer, which is this line right here. Then the PC two side sets local description, which is this thing right here.

// Then it sends the answer to the other side. What is the last thing that happens here? PC one dot set remote description, which is this line right here. If you look at the thing on the left and the thing on the right, they're pretty much the same sequential steps. Here we have two different browsers.

// Here they have done the same thing in the everything in the same browser. But, you know, both the parties are still doing the same thing to achieve a WebRTC connection, which is, you know, first party creating an RTCP connection, first party creating an offer, offering to the other side, I'm going to send you my ICE candidates. Please receive them and let me know your ICE candidates. I will also set my local description to be my ICE candidates. Then I send my offer to the other side.

// And then the other side creates sets the remote description, which is this thing right here, creates an answer, returns me the answer, sets its own local description, I set their yeah. Do we understand this already? How is how is this example? Feel like there's like a lot of things. Good thing is this is all there is and, you know, everything else from here is straightforward.

// But now this is a little better to understand. Okay. It is slightly better to understand. Slightly better only. 83%, eighty four %.

// Good. Not great, but good. So this code, as you can see, you know, initiates a WebRTC connection between two parties. There were a bunch of other things that they were doing, which we are ignoring for now. But to diagrammatically show this one last time, there are two browsers that are trying to connect to each other.

// So what do the two browsers do? The two browsers, the first browser creates an SDP basically and gives it to the other side. The other side also creates an answer and gives it to the other side. It's this is pretty much what happens. Only there are a few extra steps that you have to do.

// You cannot simply create an offer and then create an answer. You also have to set the local description. Okay. Hey, this is my offer and set the remote description. Hey.

// This was their offer. These are the two extra lines that I have on the left. Right? And what are the extra lines that I have on the right? This has to set the remote description.

// Okay. This is the offer that came in and it has to set the local description. Hey. This is the answer that I had created. That's pretty much it.

// Right? Both the sides are getting the thing from the other side and setting it locally, sending the thing to the other side and, you know, the other side is sending it is setting it. That is what set local description and set remote description means. I think you will proceed now either way and, you know, you might understand a bit of this via code. But yeah, This is how you establish a connection between two sides.

// Let's get into the code next and, you know, go from there. Might be a little more understanding. We can maybe go through this code first because, you know, this does the same thing on a smaller level. And then we can go through the same thing on a bigger level on the final code that we'll write. This just establishes a peer to peer connection(sp 56).

//(sp 56) When you actually want to send data, you have to, you know, ask for the camera permissions from the person, get their audio video streams somehow, and then call something called add track on the peer connection. And then the other side will receive the track in a on track callback. What is a track? Pretty much think of it like a video stream. Basically, if you look at the code over here, along with the code that I just shared, these many lines of code, there is something extra that was being done.

// If I press command Z a few times, you will see it says PC two dot on track equal to attach video function. Basically the browser one after all the things that we discussed today,(sp 57) you know, both the parties exchanging information, there is a WebRTC connection between both the parties. Now all you have to do is PC two or PC dot add track, Somehow send some video in here, call a function like this, and it automatically, almost automatically reaches the other side. And on the other side, all you have to do is p c dot on track equal to, I will receive a track. I just need to attach it to some video.

// So video dot somehow, you know, document dot get with element by ID video dot change video equal to track. Something like this you have to do. And even the video automatically appears here. So once you create the connection, thankfully, this API is very clean. You can just call add track on one side, and the data reaches the other side on this specific callback on the peer connection on the other side.

// That is exactly what is done here as well. Here, PC two dot on track, whenever there is a track that is received, then you just attach video to the specific basically video element. That is what the specific function does. It attaches the track that has just come onto this specific DOM object. And if you look at the code a little bit more, you will see, you know, somewhere we do a p c dot add stream.

// You can also do p c dot add track that actually sends the data from one side. P c one dot add stream, the first peer connection calls dot add stream. The second peer connection p c two dot on track receives the, video. But if you did not understand it, it's fine. Let's take a pause here.

// I feel like this will be a two day class. Let's take a breather. I think this is a lot to chew. Before we proceed into the code, which will be coming, you know, from here onwards, let's look at Q and A a bit. Let's take a breather before we proceed.

// GLARING : 
// Any questions? Does add track also get done on browser two? Well, if this browser two wants to send you data, then yes. But if browser two doesn't, then you don't have to. Only the party that needs to send the data needs to do AdTrak.
// Understood, wrote this for myself. Here only p p c one sends data where p c two is a receiver. The connection is peer to peer, but p c one is sending data because it made an offer and got the response from PC two. And yes, sir, send me the data. Offer is exactly.

// GLARING ANS: 
// Offer is what usually sends data. Answer is what receives data. This isn't technically true. An offer can also receive data, but that leads to something called glaring in WebRTC, which is why you avoid it. The party that is sending the data is usually the offeror.

// Party that is receiving the data is the answer. Just out of curiosity, let's say we have 10 people. Herkirath can't send media to nine people, but if you have something like a distributed peer to peer architecture, like you send video to two other members and then two members will in turn send the media to four members and so on. I understand this might introduce latency where HLS could be used. We achieved somewhat minimum latency, 10 to 50 people.

// So you can, mmmmm're describing is, is an architecture video. I don't send video to everyone. I send video to some people who send it to more people, who send it to more people. Yeah. That's somehow how torrent works.

// Right? There are a few seeders and, you know, you can get data from multiple seeders. You can implement it. I can tell you, it the reason you don't want to implement it is reliability. If you're on a Zoom call, there are 50 people, if one person drops off, 30 people will stop receiving video because they were receiving that video transitively from that person.

// So you usually have a single source of truth. You want to avoid the architecture that you've just described. What are ICE candidates? They are candidates that other people can, you know, connect you to from. For example, if I go back two slides, these are the two candidates that you can connect to me from.

// Note SDP :
// You can either connect to me locally or you can connect to me on this public IP. I've made screen share accounts, react app because it's in browser client working fine, kinda like in the video. When the browser asks for myQDA permission, is this for generating the SDP? No, it has nothing to do with generating the SDP. You could have a WebRTC connection between two parties that are just sharing data.

// They are not sharing video at all. SDP is needed there. SDP is for two parties to connect and tell what are they sharing. Now, if they're sharing video, then the SDP will have a video section. If they're sharing audio, the SDP will have an audio section.

// If they're sharing data, they might not share anything also. They might be like just a simple WebRTC connection we have created for kicks. It's not going to share any video. So SDP is created irrespective of you ask for video or not. How two browsers catch the offer?

// How does it know a connection is coming? Is it WebSocket using that? Yes. As I said, there's a signaling server in the middle. Right?

// That is the WebSocket server that both the parties exchange the data from. How browser okay, answer that. What if I don't use TURN Server in WebRTC project? It's TURN mandatory. It's not mandatory, but some of your users will face issues.

// You will get calls from time to time. You know, our call is incorrect and then you'll have to eventually introduce. You need a turn server. Give an overview of what needs to be done in the chess repo. Basically, if two people join a room, they should have a button that says, you know, call and then their video should appear.

// Other party should receive a notification they join the call. Then both the people can talk to each other while they're playing chess. That's it. Recap the jargon slide three. Okay.

// A lot of people are asking for slide three jargon one more time. Slide three. Oh, slide three has jargon. Yeah. So jargon here is offer, local description, and remote description.

// These are the three, four jargons. Maybe answer is the fourth jargon here. What are these four things? If you go back to Accely draw here, you will notice, if you look at just this code one more time, what do we say? We create two peer connections or maybe let's not go here.

// Let's go to this example right here. Browser one creates a new peer connection. It then creates an offer. What is an offer? It is creating an SDP.

// It is creating a very long file, which has your IP address. It has what video are you sending, what audio are you sending, all written in a single file. It sets its local description to be that and and it sends it over to the other side. How will it send it? Most will be through a WebSocket server.

// The other side receives it. The other side sets a remote description to be that offer. It says, Achcha, the other side sent me this. This is my remote description. It generates an answer and sets it low, its local description to be that answer.

// This is my answer. This is my SDP and sends this answer over to the other side, which the other side sets it as it's this side's remote description. I can totally get why this is confusing. And you know why this might take a few iterations to understand. But, yeah, that's a recap of slide two.

// I don't think it'd give you anything extra. Alright. Lot of people, slightly recap. Okay. A lot of people are interested in how does Zoom do it.

// So we can do one of two things here. We can hold off on the code for today and let's we can do architecture. Scale. Like WebRTC architecture. Scale, which means understanding the last slide, which has, how does Zoom do this?

// How does it do how would a different app do this? How do they scale? And, you know, yeah, basically the thing that got me into one of my companies where I shared an architecture. This is how I would scale WebRTC. Or we can write the code right now.

// So basically, what do we what do you wanna do? If you don't write it today, we'll write it tomorrow. How should we proceed? Let's write the code. Let's discuss architecture to scale it like Zoom.

// Alright. Title poll seven. Oh, Launching it. You know, based on the poll, let's do it. Okay, pretty obvious.


// ZOOM and GOOGLE architecture
// So it's 70% or 65%. Let's discuss how to scale it and 30% the other side. So let's write the code tomorrow. Anyways we'll give you some breathing rooms. If you want to, do this, like understand this better tomorrow, this is the code for today you'll find on slide number six.

// Try to run this project locally, see if you do see the video on both the sides, try to go through the code. The other code base that you can go through is the code base I shared in slide one, which was you know this one right here. This also is a slightly more advanced version of the same code base that has two way communication. I think it makes a lot of sense for us to discuss the other architectures first, because number one, there are like a lot of videos. You can implement this yourself.

// This is very hard to find. And you know, maybe let's dive a bit into these libraries and how they work as well. Other architectures(sp 58). A lot of people are now asking in chat, hey, this is how Zoom does this. This is how Google Meet do it.

// Like, is there a peer connection that happens here as well? And the answer is yes. If you are on a Google Meet call, you know, inside your browser, and this is browser that has open that has Google Meet open, then you do have a peer connection over there as well. If I go to meet.google.com right now and create a fresh meeting over here(sp 59), about colon web app. If I open about colon web app, you will see a peer connection has been created.(sp 60 )

// It has also connected. You might ask, Harkir, no one is present on the other side. How is this? Look at the state completed, connected. This is a good, you know, thought experiment.

// I went to meet.google.com. Let me paste this in chat. Try coming here. A few people. Don't do anything shady.

// If I admit a few people here(sp 61), let me mute my tab so someone's speaking, I don't hear it. You will see there is still a single peer connection, even though there are six people on the call right now, there is a single peer connection(sp 62), which means everything that I've told you until now has been a lie(sp 63). It is not like this is browser two. And then, you know, this is browser three. And then this is browser four.

// I have four different peer connections. That is ideally what you do in WebRTC. Right? I just shared it's a peer to peer call, which means I should have been directly connected to all the four parties. In fact, I told you I should have been able to get their IP addresses as well.

// Okay.(sp 65) I can go here and I can find, getcha, this is the other side's IP address, but I'm not able to do it. Why? Because I'm not directly connected to them. I am connected to a Google server.

// This 14225082233 is a Google server(sp 65). What is this thing on the left? This is my own IP. This is the Google server IP. I am connected to a Google server, which is doing all this, you know, orchestration of what stream I should receive and whatnot.

// So I'm going to end with the Google Meet call. The architecture that we've discussed until now does not work for a multi party call(dp 63). It does not work if more than five people come. Why? Because if this is her Kirat, how many people will her Kirat send the video to?

// Okay. So one person, two person, three person. I cannot send it to a hundred people. If I need hundred people on the call, we need an architecture that looks like this(sp 66). There is a Google server in the middle.

// I send my video. I send my video to a single Google server. I don't have to send it to everyone, someone in India, Chennai, US, Bangalore. I just send it to a single server and it's the job of this single server to forward it everywhere. E c two machines, AWS machines have high bandwidths up to 10 GBPS.

// I don't have that on my browser. I I don't have that on my hotel wifi. I can't send everyone a video. My bandwidth will not be able to handle it. But can a beefy EC2 machine handle it?

// Yes. It will receive video from me and forward it to everyone else. This specific architecture is what is called SFU(sp 67) slash selective forwarding unit. It selectively forwards my packets based on, you know, what page you are on. If you are currently on a Google Meet call, you might be on there might be a hundred people here, but, you know, you might just be on page one and everyone who's on page two, you don't need to receive that video.

// You need to selectively receive video. If there is a person, you know, if browser two has my video muted or if browser two is not looking at me right now, they don't need to receive my video. You can selectively forward information slash video slash audio to other people, which is where the name comes from. This is the most popular architecture. Be it Zoom, I would get guess, assume, of course their code is an open source, but guess and assume they use an SFU.

// Most other companies I've worked for, all of them use this specific architecture. To recap, what is the problem with P2P(sp 68)? It doesn't scale well beyond three to four people. You create a mesh like this. If this is a multi person call, I am receiving video from three people.

// I am sending video to three people. Receiving is there is a problem there as well. If I have a hundred people, I shouldn't be receiving video from a hundred people. I should be receiving video from 10 people who are on my current page. If I go to the next page, Zoom has this concept of pages, right?

// You're on page one and then you click on next, you reach page two, you see the next 30 people. Then you click on next, you see page three, so on and so forth. I should just be receiving video from those 30 people. But if you have a mesh architecture like this, you can't say, you stop sending me video for a while. And then, you know, you, whenever you reach that page, you tell this other party, now you send me data.

// So it's very hard to selectively get video versus if you have a server in the middle, you can do a lot of things. You can tell the server that I only need three twenty p video(sp 69). In fact, come back to the video call. Let me show you something interesting. If you join back in this call and, you know, have your all's cameras on, you will see, can someone turn on their camera?

// Okay. This camera is on. If I spin this, oh, see, they see pin to the screen. How do I pin this? There we go.

// Did you notice a change? It'll be very hard to see, but did you notice a change? Okay, man. Where did it go? Look at Akshay Thora's video.(sp 70)

// Let me pin it.(sp 71) Did you see a change from a low quality to high quality? And if I unpin him (sp 70), you might see okay, that's hard to see. Let me do that one more time. Let me pin him.

// Did you see the quality was really low? And suddenly became really high. Let me try that one more time on Akshat. I click on this. Quality is really low, suddenly really high.

// What am I doing? I am telling the server, kya Akshat is small for me. Please give me his three twenty p video. As soon as I pin him, I can tell the server, now you give me its seven twenty p video. All of these optimizations, you cannot do in a peer to peer architecture.

// You cannot, I mean, you can do sort of very hard to do. Basically, you know, you have to stop a peer connection, restart a peer connection, or I mean, you can find a weird way to do it. It's not like you cannot do this in peer to peer, 
// 
// 
// 
// but it becomes very easy, and, you know, an SFU like architecture to trim down the video qualities that you're receiving. If I feel like my, you know, incoming bandwidth is getting choked, if I feel like I'm not receiving enough packets, I can just tell the server, please turn off everyone's video(sp 72). And, you know, the server will just stop sending me videos.

// It'll only send me audios that might, you might have seen that on zoom from time to time or Google Meet. Okay. You know, it says, okay, you are on a bad connection and it automatically stops video for everyone. So that is what an SFU lets you do. That is why you want to use an SFU.

// For a multi person call, it lets you do optimizations like 
// stopping people's video, 
// downscaling people's video, and then, you know,
//  receiving video in a paginated manner. So that is what an SFU is.
//  A popularly available SFU is *MediaSoup.(sp 73) This is in TypeScript. 
// So, you know, everything we have done should be fairly easy for you to understand.

// A lot of companies use this. This was a popular thing in twenty twenty one twenty twenty.
//  Eventually, you know, *PION came(sp 74). Now I think PION is a slightly better one, the one right below it, this one right here. So what is PION?

// It is web it's as it says here, pure Go implementation of WebRTC. It is not an SFU. Pion is not an SFU. You can create an SFU using Pion, but Pion itself is not an SFU. It is just the WebRTC protocol written in Golang.

// So you can run WebRTC on the server. Just how you can run WebRTC in the browser, Pion lets you run WebRTC on, let's say, an EC2 machine(s[ 75]). If this is an EC2 machine and if this is your browser, you can create a peer connection here, and you can create a peer connection here in a Golang process, and you can directly send data from here to a Golang process. That is what PION lets you do. Same thing with MediaSwoop.

// Only in MediaSwoop, the thing that's running here is not Golang. It's C plus plus Let's not go there. That's architecture number two.
// 

//  MCU
//  Let me quickly discuss the last architecture, which is architecture number three, which sometimes is used, sometimes is not used. It's called MCU.

// Forgot the full form. I totally forgot the full form.
// 
//  It mixes audio and video together on the server before it forwards it. 
// 
// 
// The problem with this second approach is, k, you know, if you have an SFU and if there are 50 people on a call, you have to receive everyone's audio. You can stop a video.

// You can do pagination for video. You cannot do pagination for audio. If I'm on page one, I should still hear the person who's on page three. So the problem or the most common problem that you'll see in an SFU architecture is, can I be receiving too many audios? If there are 50 people in a call, I, of course, have to receive 50 audio tracks, which is, you know, a lot of audio tracks to create.

// It leads to CPU. It'll basically lead to audio crackling. If you do ever have 50 people on a call and, you know, you use this architecture, you will hear audio crackle from time to time because your browser has so many incoming tracks. 
// 
// To MCU says, I am going to receive a lot of audio. I am going to mix it on the server.(sp 77)

// What does mixing it mean? Basically means, you know, I am going to merge all of them together and send out a single merged audio to the end user. So the end user only receives a single audio. I do the heavy lifting of merging all of them together and sending it to the end user. This takes away the problems in SFU.

// Another optimization that is done here is, okay, only three loudest audios can be chosen care. A lot of people might be speaking, but you don't really need to hear people beyond three, three people, five people are talking at the same time. There's no point of merging five audios and sending it to everyone. So an optimization that you do on an MCO is you take the three loudest audios, merge them, and that is what you send to everyone. That way, the audio bandwidth that's going out, the audio, the number of incoming tracks that are coming are very small.

// Everyone gets the same merged audio and you don't have to worry about, you know, 50 audio streams going out.
// 
// 
//  Can you do the same thing for video? Can you mix video on the server? Can you create a grid on the server itself and send out a mixed video to everyone? You can do that.

// Do you do it? No, because everyone has a different layout. Someone might want to pin someone. Someone might want to move someone somewhere else. So you don't mix video on the server.

// What does mixing video mean? Basically, you know, creating a canvas like this, which has all the 50 people or 30 people together directly on the server. And, you know, sending that mixed audio to everyone. You get the idea. This is what mixing means, doing this on the server and sending it to everyone.

// Can you do it? Yes. Should you do it? No. Why?

// Because everyone has their own layout. Someone might, might want to pin her kit. Someone else might want to, you know, have a different layout on page two. So you cannot create multiple layouts. That will become extremely expensive.

// You will only create a single layout and, you know, you are then restricted to single layouts if you mix video on the server. So usually what do you use an MCU for? For mixing audio. For everything else, you use an SFU, which means video gets transmitted to everyone, but audio gets merged back to in a slightly more optimal fashion of only top three loudest audios are chosen and merged and sent to everyone, videos are not merged. That is the third architecture.

// This also isn't used anywhere If I'm being honest, this is an optimization you think of, you try to implement and then you, you see, but you know, this is very expensive to begin with. You know, if you, 
// 
// 
// one big difference between an SFU and an MCU is, SFU only forwards packets, which means it doesn't need to decode video. It doesn't need to understand this is an h two six four video. Is it an av one video and use something like, you know, FFmpeg to decode it versus an MCU? It does need to decode the video.

// What does decoding the video mean? As I said, video is compressed before it's sent over. And if you want to ever merge two, three videos together, merge two, three audios together, you need to first decompress them. You need to convert them into a normal video before you actually merge them, which is why you need something like FFmpeg here to actually decode the data. And then you have to merge the data.

// Then you have to re encode the data and then you forward it. So it becomes very expensive. If there are 50 calls that are going on between, you know, hundred people, let's say, then you have 50 of these merged servers running, servers that are decoding audio and then merging audio and then encoding audio and then sending them forward. So that gets very expensive, which is why SFUs are only used everywhere. You know, most if an ed tech is using the WebRTC, they are using, this thing.

// I think Unacademy uses something called Janus, which is also, you know, an open source SFU. This too, I guess, comes in Gisog as well. Right? So you might have heard of it. Oh, this doesn't.

// The other one does. Totally. Never mind. But, yeah, this is another popular WebRTC, SFU, and pretty sure this is the one that Anakami uses. But usually, you know, it'll be one of these three only.

// It'll be Janice. It'll be the one that comes in GSoC. I'm forgetting the name. Someone tell me. I'll repeat them to you in just one second.

// What's the name of that video thingy that comes in G Sock every year? Anyone know? I've made a video on it in the past. Nope. Let's see.

// janus 
// jitsi
// mediasoup -> used here
// pion

// Jitsi, there you go. Jitsi is another one. MediaSoup Ion. Basically, one of these four projects you're using. If you're creating scalable WebRTC applications.

// What do I mean by scalable WebRTC applications? Applications that need to scale to more than five people. If you want eight people on the same call, if you want 20 people on the same call, you use, one of these four projects. And most probably the one that we'll be using tomorrow or, you know, in the chess repository would be MediaSoup. Even though in chess, only two people need to talk at the same time, even though we might start from a peer to peer architecture there, we will most probably move to an SFU architecture.

// MediaSwap is what we might be using, over there. Alright. Someone said repeat MCU. Let me do that. Someone said CodeNinja also uses, the same thing, which sounds pretty good, like Jitsi.

// Yeah, this is the most easy one to, you know, set up and forget about. Anyways, what are they saying? MCU. Someone said repeat MCU. An An MCU, first in both these architectures, the user, connects to a server.

// They don't directly connect to other people. They connect in a peer to peer fashion only, but to a server. The WebRTC protocol doesn't know what's on the other side. It could be another browser. It could be another server.

// It doesn't care. Its goal is to forward video. In case of an SFU or an MCU, it forwards video to a server whose job 
// 
// in case of an MCU is that, this is browser one. This is browser two. Both of them are sending me two audios.

// You know,(sp 78) this person is saying hello at some point and this person let's just said, how are you? The job of the MCU is to merge them so that two audios sort of get merged together And then this merged audio is what goes to, let's say, you know, the third person who wants to receive the audio here and they receive, hello, how are you? Can someone tell me what is the problem in this? The problem is, you know, I cannot send this back to this person. If I say return them, hello.

// How are you? They will listen. They will hear themselves. Do you get the problem here? If I merge a single audio here and send it back to this person, this person will hear themselves saying, hello, how are you?

// They don't I don't want to ever hear myself. I want to see myself. Sure. In a video call, I don't want to hear myself. And hence what happens in an MCU is actually you create four audios.

// You know, you take the three loudest noise noises, and then you create one that merges everything and send it to everyone. And then one that merges the first two, for example, hello in this case, and forward it to this guy. And then one that merges the rest of the, you know, everything but person number two, how are you? And then forwards it to this guy, so on and so forth. So, you know, that is what an MCU does.

// I'm telling you a lot of things that, you know, it might be asked in an interview, but, you know, you don't need to know this early if I'm being honest. But yes. Encoding is required. Decoding is required. Latency is a problem.

// If you have an MCU, there will be latency because you're encoding and decoding data. There will also be syncing issues because, know, you have two separate servers now. There is one SFU. There is one MCU. One might be faster to send video.

// MCU will, of course, be slower because it needs to encode and decode data, which is why you will see syncing issues, which you cannot fix. If there are, you know, audio and videos coming from two separate services, then of course you will see a desync in the audio and the video. It's not as noticeable, but yes, it will happen. Then how does muting works if mixing happens? Muting works locally.

// Right? If I mute myself here, then I stop sending my audio to the server itself. It cannot mix it anymore. So muting happens locally.
// 
// 
// 
// 
// So how SFU work in Unacademy?(sp 79)

// It's pretty simple, right? So if this is the teacher, who is the teacher that you want to talk about? It's fine. Let's just call them teacher. They produce the video to a server, which in this case is, you know, an SFU, and all the students that are on the other side.

// I don't know how many of you have attended, an academy class, but, you know, I'll share, you know, their layout very soon. But this is, this is how it happens. You know, there's an SFU in the middle. The teacher is sending a video here that's being forwarded to everyone. If you've gone through the layout of an academy, it looks something like this.

// There's a video on the top right. There is a chat over here and then there are usually, you know, slides over here. That's what the architecture or, you know, the UI looks like. This video specifically gets distributed like this, goes from teacher to SFU and then, you know, gets forwarded everywhere. The chat probably goes to a separate WebSocket server.

// The slides that currently appear probably also go through a separate WebSocket server. If the teacher ever shares their screen, then that screen share also goes to this SFU and reaches everyone and, you know, appears in everyone's screen. I have a hunch that most probably Unacademy also does something extra, which is that they have a distributed SFU(sp 80). What do I mean when I say distributed SFU? I mean, you know, they do this, their single SFU forwards data to another SFU and, you know, another SFU and another SFU.

// And, you know, users eventually get data from one of these three edge nodes. The reason for this is I've seen them support like 25,000 people, 30,000 people, and a single server cannot support as many, video calls, which is why, you know, they most probably have a what's called a distributed SFU, which is which was pretty much my job, in one in the ForeSeeI company. They hired me because they had an architecture that had a single SFU. They wanted to scale beyond that. And, you know, I explained an architecture similar to this.

// K. This is how I would create a distributed SFU. I did not. Throughout my year, one year, three months there, did not have the time to, you know, even think about this because there were so many files. But, you know, if you know this architecture, it's a very good a very easy hire because, you know, you understand this and this is what most people or most companies are trying to achieve.

// I think Unacademy is the only one who's who's done it in India, though. They've done it pretty well. If there's one thing they're good at is, you know, their video stack, their whatever you call it, this. No? That this thing is very good, whatever their LMS thing is.

// Real world MCU use case. Great question. Can you guess? Can someone give me a real world use case of mixing? Why would you want to mix data on the server?

// Let me open Jack now. I think we can, you know, yeah. Just make it candid from here. Why would you want to mix on the server? Can anyone tell?

// It's recordings. The answer is recordings. Someone say that? No. If if it was if you do a Zoom recording, you know, if there are 10 people on the call, that those videos are getting merged.

// Anyhow, single layout is getting created, a single audio is getting created, an MP four file is getting created somewhere on the server. Cloud recording, basically, if you've heard of cloud recording, this is something that needs to merge unless you're doing it locally. If someone is doing it on their browser, then it's a different thing. But most of the times, for example, currently on Zoom, cloud recording is on, which means somewhere Zoom has a server. If you know, this is currently her Keerat, my browser. (sp 81)

// This is a Zoom s f u. These are you guys that are receiving the video. I am sending my video and audio here and you guys are receiving it, but also there is another server receiving all this audio video, most probably from the SFU, which is a mixer. Now if you want to call it an, you can call it an MCU since it's mixing video, but let's just call it a mixer. Whose job is, here, whoever is producing, if Harkir is having his camera on right now and screen.

// And let's say I invite another student on the call right now. And, you know, someone else might also be, let's say Raman is also, sending their video. Now the mixer needs to take Harkirath's video and Raman's video, put them together on a canvas, and, you know, let's say just put the screen share here and then, you know, put both the users here and put all of their audios together, mix it all together and convert it into an MP4 file. This is a use case of a mixer. Cloud recordings basically is a use case of a mixer.

// What is another use case? RTMP out. If I currently want, I can, you know, in my Zoom credentials, put an RTMP URL and stream my video out to YouTube or Twitch. There also, you know, the mixed video is what goes out eventually. So, you know, this process of mixing, is usually is the real world sort of example that someone asked for something like this.

// Note : 
// Integration is the best example. What do you mean integration? Tesla, Google, Microsoft are using MCU. Probably. I Tesla, they might almost every big company like this will use an MCU for audio, but not for video.

// I would highly doubt anyone uses MCUs for videos. Alright. Let's open chat here. That's it for today, guys, by the way. I think we're done with all the architectures.

// Tomorrow we'll be writing all the code for this, which basically means we'll be going through slide four to eight. And we will try to set up chess. If not, I'll put it as an offline video. And you know, some if you want to try it out best time, you've gone through zero to one. You have a vague idea of how to create a video call.

// You also have some code of how to create a video call. Why not set up the chest repository locally? Why not get your hands dirty and try to add some version of video call there? Try it out. The most learning will happen there, you know?

// Yeah. Back in tomorrow, we'll try to do the same thing. Let someone chat now. I'm going to call it, and, you know, answer some questions from now. Alrighty.



// Note:
// How does Transcode from seven twenty to three sixty p on the file?
// 
//  Great fucking question. I totally forgot. There is this thing called simulcast. So as you said, great question.

// I totally forgot this, but, this is Herkias browser and Herkias is sending his video to an SFU. But if you remember a while back, I said, other people can actually tell the SFU, 'K I only need three sixty p video. I don't need seven twenty p from Harkiraj because, you know, he's small on my machine. If I pin him, then this will say seven twenty p, which means either the video, either Harkiraj is sending me seven twenty p and thus SFU is converting it from seven twenty p to three sixty p. The SFU is transcoding it.

// But if you remember, I said the server, at least the SFU, never decodes video, never encodes video. It's just supposed to forward packets, which is why there is something called simulcast, which basically means this. The user itself sends you sometimes one, sometimes two, sometimes three qualities. The user's browser itself is forwarding three qualities to the SFU And then, you know, you can, when you ask the server for three sixty p, it just gives you this three sixty p video. If you ask the server for two forty p, it just gives you the two forty p video.

// You don't actually transcode on the server. The browser itself sends multiple qualities. If I go to meet.google.com, I can probably prove this as well. If I go here, unless they use, there's another fancy thing that comes after this, I'm sorry, SVC, Scalable Video Coding, something like this. Unless they use that, I can actually show you that I'm sending two videos and not one.

// Outbound. So I'm here on Google Meet. If I look at the WebRTC peer connection here, and if I search for outbound RTP(dp 82), you you will see I'm sending one video, which is three twenty by 180. And If one of you joins, I would assume, you know, and if you, if one of you joins and pins me, I would assume the second video would also begin to go out. So can you join and pin me?

// Just pin me locally on your machine. And then, you know, we should probably see another outbound RTP here. There you go. I don't see that. I just see if you notice here, the frame width and frame height increased from three sixty to seven twenty.

// Now can someone make me small and someone make me big? Like whoever's like Mati and Zela, can you make me small? There you go. Now I have one video going out that is 500 by whatever three twenty(sp 83). Now I have another video going out that is twelve eighty by seven twenty.

// So you send multiple videos, directly from the client, which leads to some load extra load on the client. Like here it is now sending two videos, but that is fine because, you know, if you're sending seven twenty p, it's only a little more work to send three sixty p, it's even lesser more work to send two forty p. So yeah, it's a long answer to your question. JS Fiddle is not working for me. I can only see left video, but I don't see the right video.

// Then you have some console errors, sir. You should go to JS Fiddle and, you know, look at the console errors. You'll find something there. I hope you have the original code there. I've made some changes.

// If you open this specific Fiddle, click on start over here. As long as you have camera permissions, this should work. If it is not working, then open your console, find some web artists here. You might try on a different browser. Yeah.




// Can we use GetStream modules instead of Direct WebRTC again? Yes. That's one set of companies that came. You know, that includes GetStream, Diet, hundred MS, LifeKit. Twenty such companies came during that bull run.

// And yes, that's exactly what they do. They hide all of this complexity for you. It comes at a cost, though. They're like very expensive at scale, at least at scale. They're very Agora is one other good example for this.

// So, you know, they get very expensive. You can use them. But, you know, it's like, do you want to create your own LLM or do you want to use ChargeGibbut API? That's the question you have to answer. And a lot of times the answer is just use the API.

// But, you know, the goal for this one is to learn, so which is why we did it. For chess, I would just create peer to peer to avoid all costs, because, you know, it's just two people talking at a time. Yeah. K. Hi, Gidath.

// Seems like so much crowd on CMS and chess. Can I contribute contribute this on one to another repos? How to catch your eyes? Yeah. That is a good question.

// I'm also not getting the time to review. How do you catch my eyes? Great question. It's becoming very it's there is a big problem that's coming now. Okay?

// You know, there are people there are companies who want to hire and I'm not able to be the right people. I don't know how. I only know for five people and, you know, all five of them either don't want to move or have, we've already referred. So we need to figure out a solution to this. Because yeah, I just get busy, but, you know, we're not referring the yeah.

// One second. If you have been contributing, even if you have created a pull request, right, even if it's not merged, just send it to Ruki for this specific role at least. So, you know, at least we have the few next roles sorted. I guess I just need to create a list of people who've at least created a PR, you know, go from there. Yeah.

// Chess players, guest not working. Why? I don't know. I haven't I haven't tested it. It should work, though.

// I think that PR was merged. SFU. Google Meet can get very expensive for Google Zoom to keep it free. How do they afford it? Well, Zoom is not free.

// Neither is Google Meet. Google Meet also, if you go over an hour, they sort of charge you or, you know, ask you to upgrade. So yeah. That's how they make money. How do how is YouTube free?

// You're streaming so much video every day through ads. Right? Do they find find some physics model around it? Stuff like WebRTC seems much more revolutionary than blockchain tech. Would you agree?

// Debatable. It's stale though, right? Like it's done. Everything that was supposed to be done, that is done, in WebRTC. Like what other use cases will come out?

// It's live video. People can talk to each other. Good. Blockchain. There are a lot of use cases that are coming.

// There might be a lot of use cases that come in the future. Currencies might get replaced. So, you know, what is more technically fascinating? I don't know. But, you know, what might make a lot of what might have more 10 x, hundred x outcomes might be blocked.

// Why we need WebSocket to Exchange SDK? Could we send via HTTP and get a response? Yes. You can. You don't need a WebSocket WebSocket connection, but, you know, you need to push things from the server.

// If this is browser one and this is browser two, whenever I create an offer and send it to a server, the server needs to forward it to the other side. So if you have HTTP, this side will have to pull. This is the most popular use case of a WebSocket server. Right? If one person sends you data, you're able to send it directly from the server without the other party asking.

// So that's what server side events are. If you want to the web socket class, that's why I use WebSockets. You can use HTTP. You can keep pulling. Why do IP addresses keep changing?

// Oh, this is a pure computer network question. You mean as I move over throughout the world, my IP address gets changed? Depends on what router I'm connected to. Right? If I'm connected to a certain wifi that is connected to a specific router, that router is owned by a specific company like Airtel.

// Airtel has a bunch of IPs that they own. And then, you know, you get assigned one of those. As you move around, you change your addresses. You change your ISP, Intrent Service Provider, and then you get their own addresses. As we are sending and receiving media through WebRTC, there are vulnerabilities inside like Omegle, which a hacker can So the short answer is no.

// Most WebRTC calls are encrypted using something called DLTS, TLS over UDP. So long story short, you know, everything is worth TLS. So it is encrypted.
// 
//  Is FTP similar to WebRTC? No, they're separate, completely separate protocols.

// Will we, will which architecture is used in games like PUBG, where they have a global chat as well? That has nothing to do with WebRTC. Especially, you know, chat in PUBG, simple web WebSocket, so they might use a lot of companies' 
// 
// 
// old games use XMPP. That's another protocol. Probably use one of them.

// Is SFU kind of a TURN server(sp 84)? Great question. No, but I totally get why you might feel that. Yes. That is a good question.

// People again, Great question. No. A lot of times you need a TURN server along with an SFU as well. The protocol that's running on a TURN server is, you know, the TURN protocol. So what project would you run on this server?

// You would run a project like Kotern here. An MCU, sorry, an SFU runs a project like MediaSu basically. So they're separate protocols. It totally, I totally get why it might feel like both are the same because, you know, they're both sort of relaying data between two clients. But yeah, they're different protocols.

// This guy is a fallback for WebRTC. A lot of times you might use them together. If, you know, I'm trying to send my data to an SFU, but I'm not able to, I might send my data through a TURN server as well. So, you know, this also happens from time to time. You have to use them together.

// So yeah, they're separate things, but totally understand why you might feel they're the same and, you know, very common interview question as well. Okay. What's the difference? What's the difference? They run different things.

// Their purpose is different. This guy's purpose is to forward video between two clients. This guy's purpose is to act as a proxy between one browser and another, when both of the sites are not able to directly connect to each other. I have, review PR, review PR. How YouTube live streaming works and how go back in live streaming video and how does live chat there?

// Also there is a few. No. So YouTube live stream is significantly different. It uses something called HLS, which stands for HTTP live. What is the full form of HLS?

// HLS full form HTTP live streaming. There you go. Streaming. There are a bunch of reasons why you might want to use here. There are two things you have to decide.

// Do you need less than one second latency? Are you okay with, lower quality slash chops? And then on the other side, you have greater than one second or, you know, five to ten second latency is fine, but quality needs to be high. No chops. You have to decide which one of these do you use, do you need?

// In case of a two way call, you need this. In case of a YouTube live stream, this is fine. Even if there's a five to ten cent latency, it's fine. Quality needs to be high, and there need there shouldn't be any chops. So for a YouTube livestream, the protocol that is used is HLS.

// For a two way call, the protocol that is used is WebRTC. The way they are distributed is significantly different. WebRTC gets distributed from an EC2 machine, which means you pay the bandwidth cost of an EC2 machine, which is extremely high. This is how like an EC two machine is from where, you know, you receive the video in case of an SFU. If this is if this is where you are running your SFU, everyone is receiving video from here, which means your EC two machine is being billed for a hundred GB every month versus if you use HLS, this sort of, you know, can be distributed via CloudFront.

// And the bandwidth costs on CloudFront are significantly lesser than that on an EC2 machine, which is why, you know, you might want to use which is another reason to use the second side. This is also much easier to scale, because CloudFront is a CDN and it pretty much scales itself. You don't have to worry about a billion people can come and you wouldn't care. But here, if a billion people come, it's a problem. You have to create a distributed SFU here on the left.

// On the right, CloudFront sort of scales to a very big number, frankly, basically. So, so yeah, that's the difference between YouTube live stream and a normal live stream or, you know, a WebRTC live stream. How do you share iPad screens? Oh, that I don't know. How does the Zoom get my thing?

// I, so Zoom gives me some sort of an integration using Airplane, Apple and, you know, directly connects it. That I don't know how happens. If the answered that sending, if the ice can reach out the IP addresses of one's own server or one's own browser, then how does signaling server, where to send the offer of the first browser? Look at the code. If you look at the code that is written here, I have created two variables here called sender socket and receiver socket.

// I've expected k, whoever is the user, they send me. Here, I am the sender. I am the receiver. So your web server of course needs to have logic to, you know, store who is the sender, who is the receiver and, you know, who should create the offer, who should create the answer. I've created in a very crude way over here, but generally you have rooms and whenever someone is trying to send video, they become the offeror.

// Somebody receiving video, they become the answerer. Twitch and Netflix use MCU. Twitch and Netflix use MCU. Why does Netflix need this at all? Does Netflix have live streaming?

// But for Twitch, no, Twitch uses HLS. Twitch try so the founder of Pion works at Twitch now. The project I was talking about, Pion, there's this guy called Sean Dupuis, this guy who worked at Twitch, then worked at LifeKit and now I think he's back at Twitch. He's leading the efforts, I would assume, for, you know, WebRTC on Twitch. Yeah.

// He's recently joined back. This was a project I was talking about, Lifecit, who's one of the good companies now. To, you know, look at their open source code base, look at the rest of you, try to fix something there. But, yeah, I have no idea. Last time I checked, at least Twitch was not using WebRTC just yet.

// Even for live streaming, Twitch was using, HLS. But I would assume, k, Sean is hired that, you know, they are making efforts to to at least try to use WebRTC there. If you're using p two p and no service there, isn't it too ex then why is it too expensive? It's not expensive if you're using peer to peer. You don't use peer to peer usually.

// You use SFUs, which is why it becomes expensive. If you use peer to peer, it's very cheap. You said initially you compared HTTPS type of calling with HTTPS type of calling. No. So there is no server.

// You just have a signalling server. It's very lightweight. So if you're doing a P2P call, it's actually very cheap. Did you create a WebRTC project or just explain the architecture to demonstrate your skills? I was creating project in my last job or, you know, the job that I was currently working at and in the new company.

// I of course explained this, I want to do that. And this is how I would improve the system. Web three cohort will come soon enough. Chess play as guest won't work. Why?

// Chess play. Oh, well, yeah. No idea. Have a look at the code. Okay.

// Answer that. Okay. One more round of questions guys. Alright. Did you create the okay.

// I answered that. I did not create the WebRTC project, at least in my CTO Intuit at the one that you're talking about. I I just explained the architecture in the interview. I had done projects, of course, before that. Like, I had written code, but did not have to do that in the interview.

// We are like in WebSocket server, we first create a HTTP that upgrades to WebSockets. In WebRTC, we create a WebSocket, then it upgrades to WebRTC. No. WebRTC was never meant to connect to a server. It was a peer to peer protocol that two people will directly connect to each other.

// So there is no concept of an upgrade. There's no concept of a WebSocket server also needed. Two browsers, browser one and browser two, can directly connect to each other. You don't need an HTTP server anywhere. So the answer to your question is no.

// There is an upgrade that happens. Do we have low cost of hosting sites for this thing? Very similar to us. How do we have low cost host do we have low cost hosting sites? No.

// I don't think for WebSockets don't think of WebRTC either. You have to you host it yourself on some cloud. There is no versa like free I mean, I guess you would host it on, you know, what's that? Keep forgetting. Render, which lets you host free yeah.

// You can host a signaling server anywhere, basically. If you're using an SFU, you have to self host. You have to host an EC2 machine. You cannot use any free renderer because you need access to the ports on the machine. And you know, you won't get them on a on a free shared instance basically.

// So you need your own machine basically. If ICE candidates are shared, can files sharing be done through public IP? Do we have a different protocol to share the files? If ICE candidates are shared, can file sharing be done using public IP? You can share data directly by WebRTC that you need some protocol to send it out to the other side.

// Right? And if your use case is you want to send files, you can do that. You can send that I'm sure you'll find an example to send a file from point one to point two using WebRTC. As long as the connection is made, you can share files with each other. Can we create a small application using WebRTC?

// Create a video sharing in two system in the same network. Yeah. That's exactly what the what we'll do tomorrow. That's exactly what's present in the slides here. A simple, you know, WebRTC call sort of a thingy.

// Yeah. Someone hosted something on an EC two machine. Welcome to coding playgrounds. All right. Let's see what that is.

// Is it better to resize the server instead of sending multiple packets? Do you mean instead of scaling it in a more distributed way? You can resize the server, but there are bandwidth limits, right? Any server at some point can have 10 GBPS, 20 GBPS, can't go beyond that. So you have to at some point scale with multiple servers.

// You can't keep vertically scaling forever. What is the difference between live streaming and video streaming? I'm pretty I would use them pretty oh, this looks like Replic. Love it. Did you use the architecture we talked about?

// Like, is this from expired? Has it been created by the Replit? Video architecture, have you created it? Your own architecture is it open source? I guess I can just read it from there.

// Sorry. Is that answer to your good question? Few topics are present in zero to one. Oh, boy. Testing we're doing in one to hundred.

// Merchant tab using WebSocket is pending. React query, yeah, I can do it probably somewhere later. ESL and NVIDIA setup is probably pending. Yes. I'll be able to do it, like, probably in two weeks or so.

// Just post it as an offline video. What is the difference between live streaming and video streaming? I guess video streaming can be done for an offline video as well. Like you, okay that's, there are like, excellent. There is something called live streaming or live video streaming I guess.

// And then there is simply video streaming or what you can call recorded video streaming. When you go to app.androidxcepts.com and watch a video, what you're getting back is recorded video streaming. The reason the word streaming is used here is because you don't get the whole file together, a big mp4 file. You get, you know, in chunks. So that's what offline video streaming means.

// What does live video streaming mean? The person on the other side is currently live and you're, you know, receiving the video from a live, source, I guess. You did some deep down WebRTC. What did you do? Did you create something from scratch?

// Not really. I contributed a little bit to MediaSwap, if at all. Why do I feel I had a PR then? Maybe I did not. I did contribute to Pyon a little bit.

// Other than that, no real deep work. I think, you know, we are like a two person team, video team, but, you know, eventually became five people. There was, like, a lot of things to do all day left, right, and center. We were just fixing fires because, you know, the biggest problem in any such company would be, oh, video quality is bad or there was stopping us. So people are complaining.

// Call isn't happening. So you have to just debug rather than implement anything. Deep work is a little too bit of a stretch. I didn't do any deep work. I just implemented all of these things, you know, very heavily in whatever companies were there.

// And you know, when you're doing that, of course, from time to time you have to get a little bit deep into why there is a problem and then, you know, go from there. How did you learn about this architecture stuff back then, considering Lagogood resources? Great question. On the job. I was introduced to so my first specific client was wanting me to just use something like Agora, which is an API.

// Someone mentioned, you know, GetStream, which pretty much does the same thing. Then eventually I realized, I joined the company and I was just given the task, okay, use MediaSoup. Now that person knew MediaSoup, I don't know how, but he said, you know, use MediaSoup and they had P2P and they wanted to move from P2P over to MediaSoup. This is my first task is how I learned. So I learned on the, on the job.

// Then after a year of working there and learning MediaSwoop from there, I went to one of their competitors and then, you know, told them I've been doing MediaSwoop here for a while. I know it very well. I, from first principles, because we had, when you're working in a company for a year and you're the one who's built MediaSwoop, you discuss architecture sometimes. How do we scale beyond this? Other people get hired, you know.

// Video team here in the original company also became, like, two people, I guess. Two two people are working on MediaSwoop stuff. So you know, you understand. You did a lot of MediaSwoop blogs. A lot of doubts you get and you reach the discourse.

// MediaSwoop has like a fairly active discourse, where you know, you a support form basically, where you can read through some it had a job opportunity section. I don't know if it's still active, but, yeah, a lot of people would pay a lot of money, you know, for this. This still seems fairly active, you know, eighteen days ago, actually ninety days ago. So if you know MediaSwoop well, you know, you'll find some sort of an opportunity here. That's a belief.

// We need a discourse like this too. We need like one this is like a very nice place to answer questions then, you know. I think they get lost on Discord. Excuse me. Let's start from the top.

// HLS versus MPEG DASH. Depends. HLS is good enough. I don't think you need MPD almost at all. Vice versa is not true.

// If you use just MPD, it will not work on iOS, which is why you need HLS. Generally just HLS works. I've built a system where we, you know, we're doing both, but eventually realize HLS is good enough and know, just use HLS and got rid of the NPD pipeline. Is video streaming overlaps with WebRTC? Sort of.

// It does, right? If you are sending video to other people via WebRTC, then yes, video streaming overlaps with WebRTC. Can you send video to other people without WebRTC? Yes. You can use HLS.

// In that case, it does not overlap with WebRTC. WebSockets is the new or WebRTC. Please tell the difference about losing packets, which you explained a part also. WebRTC came in 2012. I think I would assume WebSockets came much before, so I would assume, you know, Google this, but I'm, I would assume WebRTC came later.

// What I was saying was since WebRTC sends data over UDP, you can force it to BTCB. But most of the times, you know, if this is your SFU, you are sending in data over the UDP protocol, which means if data gets lost, it gets lost. If there is a video frame that did not come through, it is fine. And the same thing happens on the other side. The SFU might receive it, but the other side might not be able to get it because, again, happens via UDP.

// So if this side is not receiving a few frames, is it fine? It is fine. If currently my video chops out for a second, it's fine. Right? You what you focus on is, k, the live stream should keep on continuing.

// If we use TCP over here, what would happen? If a frame gets lost, it will re ask for the frame and then, you know, it'll resend the frame. But that frame is very stale by now. It is a frame from one second ago. Ago.

// What will I do with that frame? So whenever you have live streaming, UDP is good enough. Even if some data gets lost, you will see a small chop in the video or, you know, hear a small chop in the audio. And that is fine. Same happens on a phone, right?

// If you're on a call with someone, if there's a chop that happens for a second, you don't re get that chop later on and, you know, fast forward the other side's audio. You forget about the chop and you continue with the current stream. So you prefer using UDP for most live streaming use cases. Took this I know Tanmay. I did not look at the PR, but I know you've done it.

// I need to take out time to look at it. But yeah, good work dude. Are you looking out? Are you in college? You're probably in college, right?

// I don't know. But if you're looking out, being okay, right? There's a job. How do you learn? Okay, answered that.

// What's the difference between, okay, answered that. Creation and setting of local description and more description is fine, but which API sends offer to the other end? Oh, there is no API. If you look at it, if you look at the code from me today, there is no WebRTC API that lets you send data. If you look at the front end code in the next slide, you will notice I send it via a WebSocket connection.

// I do a socket dot send type sender. I do a socket dot send create answer. A socket dot send create offer should be somewhere here. If I do, I not see create offer. There you go.

// Socket dot send create offer. So that logic is owned by us. The signaling logic depends on you. I am using WebSockets. I had a WebSocket server that I had created in the last slide where I see if the message incoming messages create offer, then forward it to the other side.

// If the incoming messages create answer, then forward it to the sender socket. So since I've written the logic this way, I own the sending logic. That specific transfer depends on me. So WebRTC doesn't give you an API to actually, you know, forward data from one side together that you need to write yourself. Rust book till chapter nine done.

// Macro skipped a few steps was interested in meta programming because I was skipped a few steps just because was interested in meta programming. Zenix lifetime practices must test me. Cause actually easy trades, difficult, we'll revise. Looked at Async Tokyo, EURUSD video done. Rusting, Rustling, 54.2% done.

// Blockchain basics, smart contracts done. Understood gas optimizations, signing transactions, roll ups, layer one layer two chain, extending functionality of the chain to using Oracles, looked into move and sway, feel similar trust. Fucking name bro. Nice. You should join us at TA if you've done this much for us in the web 3.04, Trishan.

// Ping rookie. Yeah. Good work. In the Google Meet or Microsoft Teams, there is a filter feature that let we can add to our videos. How does that work?

// That's usually local. If I do a filter, I have a filter added locally. The video that I'm sending to the server now has my filter applied on top of it. You don't do filter on the server. They get very expensive.

// You have to decode videos. Usually they're like locally done. And you know, the video that you're sending from your browser itself is filtered or it has like a filter on top of it. Does the filter okay. I answered that, your question.

// Does the filter apply on the server? Then we receive it back. You see the filter version, the same for every participant of filter and apply on the browser. Yeah. On the browser, because, you know, if you don't do it on the browser, then the server needs to decode the video, add the filter on top, re encode the video and send it.

// It gets very expensive. What is the difference? Okay. Answer that. Answer that.

// How are you able to build these projects like Omegle, Replit? How to approach? What is the process for a beginner to build projects? Let's pick a random website. Let's pick I'm assuming you need some ambitious use case.

// Chess, for example. Right? Yeah. I think I've just built a few of these ones so, you know, building it the second time seems straightforward. But also, you know, I am also not right all the time.

// Maybe it doesn't do what I think it does. It's just one way to build it. As long as it scales, it's resilient, it is able to cover all the functional requirements. Whatever architecture you build is fine. You should just be able to prove.

// K. You know, if a spike comes, you should your system should be able to handle it. You are able to monitor the right things at the right time. And you know, everything else is first principles. By first principles, I mean, you know, you think what considering I know that HTTP is a protocol, WebSocket is a protocol Kubernetes is a thing, pods are a thing, there is containers.

// Which one of these do I need to use? Which are the mode of this specific application? For something that erupted, it's containers. For something like chess, it's WebSocket servers or real time communication. For something like what was the other project?

// Omega, it's, you know, WebRTC. And, you know, considering you have enough knowledge now of SFUs and the fact that WebRTC is a peer to peer protocol, you can decide it is an Omega like use case to probably need to do peer to peer. So, yeah, that's how you decide. Alrighty guys. I will call it here.

// Oh God. What a long class. Tomorrow we will do the implementation of what we've learned today. We'll try to first go through this implementation from slide three to eight, then we'll try to integrate into chess. And if you want to do it yourself, you should before tomorrow.

// Alright? Try to do it create a PR. Most probably it'll be closed, but, you know, try to do create a video at the very least. Create a PR also, but create a video and show what you've done. That's the easiest way for me to look.

// I'm very happy to look at the code. But yeah, that would be a great assignment to do if you want to try it yourself. With that, let's end it. A few more questions, so last set of questions, then I'll call it. Ruki seem too busy these days.

// Can you do a DM on Twitter? DM Ankur, if that's the case. But if Rookie is busy, that's a problem. We probably need another mod, if that's the case. Adrian, people will ping you with GitHub issues.

// Please create a talk. Alright. But yeah, let me know if that's the case. Tag me. Let me know if he doesn't respond.

// Happy to, you know, get another mod. I think we need another person. There's a lot of people to handle. What are the open source projects using SFU we can contribute using an SFU? Go to MediaSoup, search for MediaSoup on GitHub.

// You'll find a bunch of them. But you know, as I said, rather contribute to LifeKit, contribute to MediaSoup. The founders of MediaSoup who work at Miro right now, I'm assuming, because they they created their own Zoom like product called Around. Didn't do very well, so they got acquired by Miro. Miro is also a big company, get into their eyes.

// One of the core millionaires of Mediasoup now has its own, Web3 company called Subspace. He's a founder there. There is like 20 mil or something like that. If you show him, you can contribute to MediaSwoop and Rust. I'm sure, you know, he'll be open to conversations at least.

// What else? Yeah. So MediaSwap and Rust is one place you can contribute, but you need to know a lot of WebRTC to do that. MediaSwap has like a Rust binding as well. Just like you can do an NPM install MediaSwap, you can do a cargo add MediaSwap as well.

// So that might be one place to look at other than that. I said as I said, LifeKit. LifeKit isn't Golang. But LifeKit is a, you know, aggressively hiring company, at least from, you know, my knowledge. So, you know, that might be one company.

// Because most people are most companies I used to work at are now all moving to life kit. So I would assume they're doing well. Back in the old days in the two gs era, I used to play video games and then pause it after five, ten minutes. The whole video get loaded to avoid all the buffering. This doesn't work today.

// If I like if we pause and load two, three minutes, then it stops. Why? What changed in the protocol in area? No idea what used to happen. Where do you see it used to happen?

// I used to play with you and then pause it after five, ten minutes, the whole video. Yeah. Yeah. So HLS will not fetch all of your packets. I'm assuming you're, what you're saying is you used to pause, wait for the whole video to load and then, you know, play the whole thing.

// But now it doesn't happen because now everyone uses HLS. And HLS the way the protocol is written, it asks for the next few chunks, never really asks for the whole set of chunks together. I'm sure there's a way to change it. But, yeah, that's that's why it's not happening right now. Maybe there's a different protocol.

// I mean, not maybe. There was a different protocol being used before and maybe that protocol was like, you know, whatever I can get, I will keep touching. System built on trust, which makes sense and trust. That is a good question. Try to connect to Zerodha APIs or, you know, some trading bot APIs, build Zerodha, grow in Node.

// Js, and then try to do the same thing in Rust and try to see what has more what has lesser latency, and how can you make it even lesser? What do you have to do? Careful, let's say, trace trades based on something. You have to create a simple bot that checks the, no, not that. Keep forgetting that.

// So maybe create a trading bot between Binance and Kraken. Forget anything, everything I said about Saga. Create a trading bot that tries to, you know, find any arbitrages if they exist. If the price is a little mismatched on Kraken and Binance, let's see. Then, no, tries to trade.

// That's that's what most traders do. They do bunch of other things, but, you know, this is one thing they can do is, you know, find a price difference and try to capitalize on it. And their speed matters too much. That's just one way to increase speed there. You know, you have your application deployed in a bunch of machines all around the world that all try to place your relevant order.

// But, yeah, that's a good that that's a decent ish idea to pursue. Try to create it in Node. Js first. Try to create it in Rust then. C, are you able to get prices from Binance faster in Rust?

// Are you able to send trade requests to Binance faster? That's one reason for it to make bill, I think. Okay. Alright. We'll call it here guys.

// There's an e commerce website I'll look at and then we'll call it. Looks pretty decent. It looks pretty yeah, it looks pretty good. Is the UI like, kind of retro by choice? Probably is.

// Yeah, man. It looks pretty good. Alright, guys, let's call it here. I will see you guys tomorrow. Have a good night.

