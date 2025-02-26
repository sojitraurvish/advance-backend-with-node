// serverless arc
// see photo 1,2


// As always, all the slides are present on projects.hundredxsteps.com. I would urge you to go here. Today, we are doing something called serverless back ends. This whole week is going to be on how to deploy applications. Basically, we've built a lot of local applications.

// It's been hard to deploy them, because, number one, I'm not taught how to deploy. Even if you know how to deploy, you have to you need a very basic credit card to get, like, an AWS subscription or at least get an AWS account, or even, like, GCPS or whatever. So for that reason, and just because this is a good thing to know, I wanted to introduce serverless back ends in this cohort. I was going through the syllabus yesterday, and we're pretty close in zero to a hundred zero to one. The only big thing that's left is, Next.

// Js. Everything else is fairly small. The things that are marked in gray are done. White are still left to be done. A bunch of these are pretty small, can be covered offline, for example, this and this.

// The only big thing is Docker containerization and Next. Js, and maybe this, and, of course, building the projects. And this part, well, still a lot to cover. And the one thing that was present here and I hadn't yet covered was deploying, to AWS servers. That's what we wanna cover tomorrow.

// And serverless backend is the listing right here. That's what we'll try to do this week. I think we're still on track to finish probably not end of this month, but mid of next month. We'll see how that goes. Cool.

// PKG would urge you all to go to projects.hundredxdevs.com. Today is going to be about serverless backends. In this module, we will go through serverless backends, how can you deploy your serverless backends for free even without a credit card, and how can you work with Cloudflare workers? What is connection pooling? This is the mildly advanced thing we learned today.

// Everything else should be straightforward. And why is it needed for cases like serverless backends? Alright? Would urge you to open this. I'll be following along from here.

// Let's get right into it. Cool. What are back end source? Let's begin there. Just wanna make sure chat.

// Everything is are we good to go? Can you guys see me? Can you guys hear me? Alright, perfect. So let's begin with what are backend servers.

// Until now, you have written a bunch of express servers hopefully. I generally hope you have written at least something, a back end of an application, but you haven't yet deployed it on the Internet. We discussed this very beginning when we were discussing HTTP servers. This is the architecture that is usually followed when you're hitting a back end server or a front end server. This might be you somewhere in The US.

// And the server where your code is hosted, where your express application is running, is hosted somewhere else. Until now, we haven't deployed any back end application, which is why you haven't seen this architecture. You've only run things on your local machine on local host colon 3,000 and hit them from your browser. Eventually at some point if you want to deploy an application like this, projects on 100xpps.com, facebook Com, or google.com, you need to host it on a server. This is where cloud providers come into the picture.

// Cloud providers are basically people who realized very, like, twenty eight eight, '20 '9 ish that it's very hard to buy these servers and normal people cannot do it. So very big companies created these back offices or, like, a sub company inside them, that provides servers for rent. So if you have ever heard of AWS, if you have ever heard of GCP, they're nothing but sorry. Shared the wrong thing. If you've ever heard of AWS, which stands for Amazon Web Services or GCP or Azure, they are what are called cloud providers.

// Why are they called cloud providers? What does cloud even mean? It basically means that you don't, if this is the world map, you don't have a physical server here in India or wherever. You can host it on the cloud, which means AWS or Amazon has a very big data center in The US, very big data center in India, very big data center in Australia, and you can rent a small server here. And then that is where you will deploy your back end code.

// Before 02/2008 or wherever, AWS was the biggest sort of big player that came early and changed this market. Eventually, Google realized it's too big of a market to ignore, then GCP came, and then Microsoft also jumped on the bandwagon. But before AWS, people would literally buy hardware servers. In fact, when I was in college, we had a lot of these, you know, hardware servers in our lab where we would host our applications. We would not use AWS or GCP or Azure.

// This is not very practical to do today. Today, 99%, if not more, of the biggest startups are hosted in either one of these cloud providers, and that is what you should do for your application. Barely do you need to host on your own servers, unless there's a very specific need, unless these cloud providers are becoming very expensive for some reason. You don't self host. You host by renting machines on other people's, data centers.

// Specifically, the biggest ones are these. Alright? You might have used Express to create back end servers until now. The way to run it usually is node index dot JS, which starts the process on a certain port. When you have to deploy it on the Internet, there are a few ways.

// Go to any one of these providers, GCP, Azure, CloudFlare. Rent a VM, virtual machine, a machine that it's called virtual machine for a few reason. It's not really the machine that you it's not like this Mac machine that I have here. If I have a Mac machine here, it's not like they have a Mac machine running there. They have a very big machine which they create VMs on top of or what are called virtual machines that that people can access specific machines.

// They're called virtual machines because the access that you're getting the thing that you're getting access to is something virtual running on a very big thing, which is why it's called a virtual machine. You can rent to those and deploy the application, and then these are fancy things we will eventually learn in one to hundred. K. How you can auto scale them as well. How you can in the real world, your application won't be running on a single server.

// If there is Swiggy in the world or there is a Zwack or an Uber, they don't have a single they don't have an architecture like this. Server is here, and everyone is hitting this server here. They have multiple servers all around the world, and they auto scale based on the, the load that they're getting. These are two fancy ways to deploy. This is the easiest way to deploy.

// This is how you would deploy in college, in a hackathon. One of these is how you would deploy, or, like, more fancier ways exist to auto scale. Those you would use to deploy an application in production. There are a few downsides for this though. If you rent a virtual machine, or if you create a Kubernetes cluster, which what it is we will discuss eventually, or you put it in an auto scaling group, In all three of these cases, you are buying at least one Sarwar.

// Here you are buying more than one. Here you are buying at least one. By buying, I mean renting, paying $20 a month for. K. I will get at least one Sarwar in India.

// I'm going to pay $20 a month. But the problem is, if you have just started your application, no one is going to use it. For example, projects.hundredxdevs.com, barely, let's say, a hundred people visit every day. Does it make sense for me to buy a server or or rent a server for $20 a month when it's getting very minimal load? When the CPU usage here is going to be only 0.01%?

// Why should I pay $20 a month? Wouldn't it be easier if I could pay on a per request basis? And secondly, what if suddenly a hundred thousand people visit this website? I created a video. Everyone came here.

// Then this single server won't be able to handle a hundred thousand people, and I will have to auto scale. I will have to start one server here. I will have to start three more servers here. So these are the two problems with an architecture like this or deploying your application like this. Taking care of how and when to scale.

// Base cost is there even if no one is visiting your website. Even if no one would hit this website for a month, I still pay $20 a month to AWS. Monitoring various servers to make sure no server is down. This is the third problem. What if I'm sleeping and this server goes down for some reason?

// There should be some failover. There should be some way to start another server if this one goes down, and I will have to monitor all of that. These are the downsides of specifically, based on this approach. Monitoring can be taken care of if you use a Kubernetes cluster. But if you're literally renting a VM, there's a lot of headache you have to go through, especially initially, and you have to cover a base cost.

// What if you could write the code and someone else could take care of all of this? I write the express application and give it to someone. I don't want to worry about deploying it. I don't want to worry about how to auto scale it, and I want to pay minimal fees. If no one visits my application, I want to pay nothing.

// If two visits happen, I want to pay 0.01¢. If a hundred thousand visits happen, then I will pay $20. What if the pricing could be done on a per request basis rather than me having a server up and running always and me paying $20 a month. This is where serverless back ends come into the picture. Now the name is a little misleading.

// Serverless does not mean there is no server. It just means you as a developer, don't worry about the server. There is still a server, but it is maintained by someone else. What the architecture is, we will see very soon. But before that, let's look at a PG definition of what a serverless backend is.

// Serverless backends is a backend serverless is a backend deployment in which the cloud provider dynamically manages the allocation of provisioning the servers. The term serverless does not mean there are no server involved. Instead, it means that the developers and operators do not have to worry about the servers. I'm hoping that's self explanatory. K?

// The cloud provider just makes sure of auto scaling your application. If no one is visiting, it'll have pretty much no server. I mean, as soon as someone visits our websites, it'll start a very small server. If 20 people visit it, it'll start a slightly bigger server. If a lot of people visit, it'll start a bunch of these servers.

// It doesn't exactly start servers technically, but you get the idea. An easier definition. What if you could just write your express routes and run a single command on your machine, something like NPM run deploy, and the app would automatically deploy, auto scale, and charge you on a per request basis? These cloud providers realize that this is one, a very big use case, and two, can be very profitable at scale. Serverless gets very expensive at scale.

// If you're beginning to hit the scale of Facebook or any big application, you should move back to an architecture like this VM architecture, because serverless gets very expensive, because the per request cost is really high. But until then, it is always a good idea to deploy to serverless. What are the problems though? Number one, more expensive at scale. Number two, something called the cold start problem.

// The name is slightly self explanatory. Cold start problem, but let mea quickly share what that means. Since AWS is charging you on a per request basis, which basically means if there are no requests, then they will charge you $0. If no one visits projects.hundredxdevs.com, they will not charge me anything. Hence, if this is the world map sorry for very bad time here.

// They are not going to bring up any server for you unless people are hitting your application, Unless someone is coming on projects.hundredxdevs.com, there is no small, even miniscule server running anywhere because they're not charging me anything. If they're not charging me anything, why would they bring up compute to handle my requests? The problem comes here. What if no one has visited visited the website in two hours, so there is no server running in the back end of this, and suddenly someone comes? The AWS cluster is going to be like AWS servers are going to be like, bro, I'm not running anything right now.

// And suddenly someone is at visiting projects.hundredxdevs.com. I need to start a server really fast. So it or very quickly tries to start a very small container so that it can handle this request if no one had been visiting the website for a really long time. This is what's called the cold start problem. If no one has visited your website, your server is cold, which means it's it's shut down for now.

// No one is running your back end application. And the first time someone comes, they will see a very high latency. They will see that zero point five second latency because it had to start the server and that took zero point four seconds. Now if they hit a hundred times, that's fine. But the first request that comes after a really long time faces the cold start problem.

// There are a few ways to fix it. You can, you know, keep pinging your application every five seconds to make sure there is always a warm server running, or you can maintain what's called a warm pool. I want minimum one server to be up always. And after that, it can auto scale up and down, but at least one or two set of servers I will have in my pool. Pool means it's going to be always up.

// Alright? So these are the two problems with the serverless. More expensive at scale, cold start problem. Easier to fix, but this one is easier to fix. This one is not.

// So you usually move away from it as you get a lot of scale. What do I mean when I say get a lot of scale? I mean Facebook scale or even lesser, like Swiggy scale, Razorpay scale. Any big application will get really expensive, and also very slow, like, compared to owning your own infrastructure. So you want to eventually own your own infrastructure.

// But for a project that's just being brought up from the ground and no one's going to visit it, Savile is the beautiful architecture. In fact, that's what projects.hundredxdev.com uses. And if you were on the stream in which I coded this, this is the reasoning I gave as well. K. I don't know who's going to visit it.

// I don't want to pay $20 a month, which is why I use Savales, and right now I'm paying, you know, pennies on the dollar. Paying less than 5 rupees a month because no one visits this website. Alright? Cool. Famous serverless providers.

// There are many. We can discuss all of them if need be. The architecture is the same. The right the way to write code is a little different. The command could deploy a little different.

// AWS has the most famous one is AWS Lambda. This is probably the first one as well. I could be wrong. But I think they were the ones to pioneer this architecture. I could be wrong, which which is why they're the most famous.

// Then Google has something called cloud functions. That is what projects.hundredxdevs.com uses. I can show you how you can bring up these cloud functions as well. And Cloudflare Workers. This one I'm using today because it's free.

// Basically means you can actually, without even putting in your credit card, deploy some back end on the Internet. So, basically, you can deploy a full stack application. Deploying front ends are easier. You can use Vercel. Deploying back ends can get expensive, but if you use something like Cloudflare, for the first lot of requests, you would have to pay anything.

// You don't have to put a credit card. I hope you've already signed up on Cloudflare. If not, now is the right time. So this is what we're going to, implement today. A few workers.

// How do you write workers? What is the architecture of these, what are called, workers in CloudFlare? So yeah. If you go to the website, this is what it says. You write code.

// We handle the rest. Deploy serverless code instantly across globe to give it exceptional performance, liability, and scale. That's their pitch, and you can find it if you go here. And that's what we'll be implementing today. Alright?

// When should I use a serverless architecture? As I said, when you have to get off the ground and don't want to worry about deployments, don't want to have a DevOps engineer and infrastructure engineer who is going to monitor the servers all the time. When you can't and distribute the traffic and don't want to worry about auto scaling, and if you have a very low traffic and want to optimize for costs. These are the three reasons or three cases where serverless shines. When does it not shine?

// When the scale increases, when the team size increases, the costs go up by a lot, and it's also slower than maintaining your own infrastructure. So eventually, at some point, you want to maintain your own infrastructure to get off the ground one of the best architectures and the cheapest architectures to use. Alright? Cool. Let me do a quick poll.

// I think everything shouldn't be too difficult, and then we will start to write some code. Would urge you to sign up on CloudFlare really quickly. Alright. Great. 96% is beautiful.

// Please sign up on cloudflare.com. I thought I did, but maybe with a different browser. Alright. Let me do that as well. Let me stop sharing my screen and sign up or sign in in Cloudflare.

// Would urge you to do the same. I will see you guys in two minutes. Alright. Cloudflare is one of the so that mode is basically they prevent what's called a DDoS attack or what's called a denied distributed denial of service attack. This is one website I don't expect to break.

// If all of you visit it and sign up together, I'm pretty sure they'll be able to handle it. This is one of their biggest moat, handling attacks like these. If a lot of people they understand when an attack is happening. They understand when, you know, 500 people or a thousand people from India, from distributed cities are signing up. So I would expect this to not not break today.

// I could totally be wrong, but pretty sure you you'll be able to sign up. And as I said, they started off I mean, I don't know their history, but their biggest moat, the reason people love using Cloudflare is their, redos attack prevention. In fact, if you go here to cloudflare.com, On the top right, you will see under attack because, you know, that's one of their one of their top funnels, why people love to use them because whenever you have a big application, someone will DDoS you. And when that happens, you come to Cloudflare. We'll discuss this in one to hundred, by the way.

// Alright. Just wanna make sure everyone has signed up. As I said, I'm hoping they can handle the scale, but I could totally be wrong. So let me just check if everyone has signed up, and then we we're good to go or at least 90%. Oh, great.

// Okay. You like that. So 90% has been able to sign up. It's as simple as going to this website and signing up, so I'm I'm gonna spend a lot of time here. Let me explore this dashboard with you.

// They have a few things. And every cloud provider, even if you log in to AWS or GCP, you will see a bunch of buttons. They have their own services. People name them. Why did they name this turn style?

// I don't even know how to pronounce it. Because of the developer there. Why did they name it r two developer there? You will see a bunch of these names, which don't get too worried about. Every provider has their own way to name things.

// In the end, they are providing you servers. They are providing you storage. They are providing you containers. They are providing you Kubernetes cluster. They are providing you domain management.

// So every AWS cloud provider provides you 10 different things. So does Cloudflare. This section you use if you have a domain like hundredxdevs.com, or for example, I also have this domain called 10kdevs.com. If you have a domain like this, if you want to buy a domain like this, if you want to point your domain to something, you can use this section. Name is self explanatory for analytics, tracking how many people visited your website.

// No idea what this is. Probably for maintaining who can access your resources. No idea what this is. This is for, the thing that I was talking about too. Prevent a DDoS attack, CAPTCHAs if you might have seen them.

// No idea. No idea. Bunch of other things. What are we working with today? This section right here called workers and pages.

// Getting started with bugs. Build serverless functions with workers, deploy websites and full stack applications with pages, read documentation, yada yada yada. This is the serverless provider or provider offering of Cloudflare, what are called workers. What do they let you do? They let you write some basic back end or even front end code and serve them serverlessly, which basically means you deploy them, and then these guys maintain where it is deployed, what country it is deployed, and how many instances are deployed, so on and so forth.

// So if you have signed up already, let's go back to the slide. And what does it say? Create a test worker from the UI. Yeah. So what you can do is, try creating a worker here.

// So click on the go to workers, click on create worker, and it'll show you some code. Don't worry too much about the code, but it has a simple worker dot JS file, which exports by default a fetch function, which gets a request, something called ENV context as input, and returns a hello world. We will see what this syntax is. Why is it so different from express? How can you start to write full back end applications?

// But I hope you look at it and understand catch up. There is a single fetch function. And this returns a response, which says hello world. And whenever you're visiting this website, probably the control reaches here and it returns hello world from the back end, which is not JSON. It's It's simple text, but that's fine.

// Your back end can return simple text, doesn't always have to return JSON. That is what this simple application is right now. Try to deploy it. And as you can see, look at the visualization on the right. It tells you, okay, we can, if they they haven't yet, but they can bring up, you know, this back end in any of these regions based on who is visiting it.

// If someone from India is visiting it, they'll probably bring up a server here. If someone from Australia is visiting it, they'll bring up not a server exactly. They'll bring something up. We'll see what that is. But that's what this single command lets you do, and it is down, surprisingly.

// Most probably because the DNS hasn't propagated. The worker is most probably up, but worker gentle rain fvd.kilostechnology.workers.dev, this DNS hasn't propagated, which means This domain name isn't yet pointing to any one of the relevant IPs. If you wait for a bit, you should see this running. I don't know how many of you are seeing the same issue. Let's let me or the worker is not on not up, and we have broken Cloudflare as well.

// I don't think that's the case. I've seen this before. K. It takes them time for, you know, whatever new DNS DNS they have registered here to propagate. You can confirm that by running Ping on this.

// I do see a DNS propagation. Oh, wow. One of two things has happened. Either we have broken Cloudflare or it'll just take some time to propagate. We will wait.

// But anyone else been able to deploy? Let's see. Pretty sure it'll be up in, like, sometime. The p l launch poll. Were you able to deploy your first worker, and does it work for you?

// Let's see how for how many people it works. No. Fifty fifty. No. It's thirty sixty.

// Most people claim it does not work. Do all of you for whom it does not work see this? For everyone who for whom it does not work, do you see this? I think we just we just broke cloud data also. Or yeah.

// You see this? Okay. Most people do. 20% don't see this also, 30%. What do you see?

// Let me open chat. Let's try to debug really debug this really quickly, but I'm sure it'll come up very soon. Working, working, nothing. Works for me, nothing. Works for me.

// Same as oh, there you go. Deployed. So wait for a bit. Eventually, it'll come up. Yeah.

// I'd be really surprised if, you know, this does not work for you. It did work for me, and I think the problem was, you know, it was still deploying. So many people deployed together. Yada yada yada. Cool?

// Alright. We're going to proceed. If it did not work for you until now, it will work very soon. And what did we do until this point? We signed up to CloudFlare.

// We said create a new worker, clicked on this button, and some demo code we hosted. This much code I'm going to put on my worker. And what happens when I hit this website? Hello world gets returned. Why?

// Because when I hit this website, control reaches here. This is similar to app.get. Only this handles everything. This is app.get, app Post for any route. Control will reach here.

// How will I create a complex application if control is always reaching here? We will see very soon. How you can do routing? How can you figure out if this is a get request or a post request? What is the route?

// What are the headers? What is the body? Everything you can get access to here, But this is the starting application, boiler plate to say, which returns just hello world. If you change this to something else, that something else is what you will see over here. If you change this to some JSON object, that JSON object is what will get returned here.

// Alright? Very basic application done. Deployed on the Internet. What is the best part? The best part is deployed on the Internet for free.

// You do not have to put in a credit card. You didn't have to pay anything. Alright? Let's discuss a little bit about how Cloudflare workers work. This is super interesting in case you're generally a nerd.

// You don't have to know this. But there are some details here that are super not relevant, but interesting. The architecture of how they have created, this serverless architecture, why it is much faster than Lambda is what they claim, and what sort of architecture that they've used. Alright. There is a detailed blog post here that can take you through this if you want to read through it.

// I've trimmed it down the best part from it to keep it here. The big thing to know is Cloudflare workers don't use the Node JS runtime. I repeat, they do not use the Node JS runtime. Whenever you write some JavaScript code in the back end, you can run it using node. You can run it using another famous runtime these days called bun.

// What is a runtime? A runtime basically is a compiler. Someone has written let me share my screen. We discussed this a little bit when we were going through introduction to Node. Js.

// If you remember, I said there was this v eight engine that is used inside Chrome, and some smart people pulled it out and said, we are going to use this engine and run it on the back end, and that became Node JS. Now when you are running a CloudFlare worker, what can happen? What they have done is give this is the world map. They go here and run node index dot JS, where index dot JS is your application, and, you know, run it using the Node JS runtime. The problem with this, this is not very easy to scale.

// You are starting a new node process for every application. You don't know how an optimal node is as a runtime. So what they did was they created their own runtime. They used v eight and created their own competitor to say of node. And they said, we are going to run this and the architecture is going to be a little different.

// We are going to try to start a single node JS process inside of which we will run a bunch of small workers. You can always think of this yourself. Right? Okay. If two people someone gives me index dot JS file.

// Another person gives me index two dot JS file. These are the two workers that people have given me. And I want to run them inside, you know, my Node JS process. I can combine them. Right?

// I can do app dot get user one. Go here. User two. Go here. You can basically, what I'm trying to say is, you if you have to create something like this, if you have to create something like cloud flare workers, the bad process probably is running multiple node just processes.

// Node. So on and so forth. The better process is somehow running a single process, but route routing things the right way. What is the problem there? The problem there is what if people's code interferes?

// One process's memory should not be able to be accessed by another process's memory. It's become slightly unsafe. I don't want my backend code to run-in the same place where someone else's backend code is running. So we'll see how they optimize it, but this is their approach. Let's read through what it says.

// Though Cloudflare workers behave similar to JavaScript in the browser or in the Node. Js, both in the browser and in Node. Js. Basically means, if you want to run Cloudflare worker code, the code that you've written, you can also run it in a browser. Sound surprising?

// Running an Hlib server in a browser? Yes. That's what their pitch is. There are a few differences in how you have to think about the code. Under the hood, worker runtime uses the v eight engine.

// So as you can see, it says worker runtime. They do not use Node. Js. They do not do not use bun. They have written their own worker runtime, which is based on top of v eight.

// The same engine used by Chromium and Node. Js. The worker run time also implements some of the standard APIs, a little bit in most modern browsers. The difference between JavaScript written for browsers or node happens at run time rather than running individual machines. Worker functions around Cloudflare Edge network, a growing network of thousands of machines.

// Okay. Too much jargon here. What does what is the what are they trying to say? Could they have their own run time that they have created? They have a bunch of servers all around the world that is running this run time.

// And whenever you start a process, it runs in one of these cloud edge networks or one of these servers, basically, based on where the request is coming from. If it comes from here, it goes to here. If it comes from The US, the request goes here. One extra jargon to introduce. You don't have to understand it.

// The goal is to understand their architecture, the approach they took. Even if you don't understand it, it's fine. This is how they claim they are faster than competitors like, AWS. What they say is, v eight orchestrates isolates. Now this this is a jargon that I didn't even know until yesterday.

// V eight, the engine that, Node. Js or even Chromium uses, the one that engineers at Google have written, is a lightweight con it uses something called isolates, which is lightweight context that provide you with code with variables that provide your code with variables it can access in a safe environment that can be executed within. There's two more jargon here. Let me explain why the, diagrams here. When you want to build something like this, you can either start multiple Node JS processes, which are running the user's code.

// These brackets here is the user's code, and this arrow here is the process overhead, which means starting a new process. So you can either do Node index dot JS nine times, or you can do node index dot j s a single time and run multiple codes inside. And to make sure people's code doesn't interfere with each other, you use this thing called isolate, which is something v eight provides you. Even if you don't understand it, it's fine. Even I read this yesterday.

// And what did I understand? I understood rather than starting node index .j s nine times, you start node index dot j s one time, and based on who is accessing a worker in this specific region, in this specific server, you start their code inside this runtime, and you don't have to start multiple processes. That's what makes it slightly faster. Cool. Just a high level architecture of Cloudflare Workers.

// If you want to dive deeper, here is a blog post I did also yesterday. I'm happy to at the end of the class, but this is the best juicy bits that I could squeeze out before we actually start writing some code. What do you have to understand at a high level from this slide? It is that their run time is different, and this is important because, I don't know if you guys know, but yesterday, AWS also introduced their own JavaScript run time to probably compete with them, because they had Lambda, then these guys brought their own run time and said, this is what makes us better. And yesterday, AWS released their own yesterday or day after day before yesterday, AWS released their own AWS, run sorry, JavaScript run time.

// I forgot the name. LLRT or something like that. Low latency JavaScript run time, which basically lets you write the JavaScript code, but it gets run very fast. So that's their competitor to workers now. Kehana, we have brought something new.

// This keeps on going on, but I hope you get the idea. Creating their own run time, and then deploying it in this way, so that it's slightly better and faster. Cool g. Let's write some code locally now. Let's create a local back end application, and let's see how it's different from an Express application.

// Why is it different from an Express application? Why can you not use Express when you are using Cloudflare Workers? Alright. Let's kick things off. Let me do a pause here, and just make sure we're good to go.

// We'll do some basic stuff, and then I'll take a break at fifty, seven fifty. But let's at at least bring the project locally, and start to play with it a bit. Alright. 93% is great. Let's write some code, and then there'll be a ten minute break at 07:50.

// Alright? To create and deploy your first application, you can follow the following steps. They're all present here. You can copy. I mean, I would copy as well.

// You don't I don't necessarily expect you to know these. So this is how you can initialize a basic application. This is similar to npm create vite that initializes a React application. You can use this code to initialize the basic code of a worker to copy n p x create cloud flare dash dash, give it a name. Run this in your terminal.

// If you have node installed locally, it'll just work for you. I'm going to do the same. Open a terminal and run. NPM create Cloudflare my dash app. It's asking you a few things.

// So I'm going to take a two minute, not two minute, ten second pause here. Try running this command and then reach this point. Ten seconds. Alright. It gives you a few options.

// This is so the CloudFlare workers are extremely powerful. We are writing a very small backend application, but they let you do a few things. Something called, they let you use serverless storage as well. What is serverless storage that goes up and down, and they maintain it for you. You don't have to bring up a database on NeonDB.

// They take care of storage. A simple website if you want to host it, so on and so forth. They're like, 10 different things it provides you, scheduled worker, which means something that runs every day. Let's say you want to clean up your database every night, or you want to, you know, send everyone an email every night. You have only done 10 assignments today.

// You should have done 20 in an application like ours. So you can use something like this to run every something every day or every hour or every minute. What are we going to use? A simple hello world worker for now. Eventually, if need be, we can try the other options.

// But for now hello world worker, you should use TypeScript. You should not use JavaScript. I mean, you can use JavaScript if you want, but I think we've done enough TypeScript now. So we'd urge you to use TypeScript and then we're good to go. Open this in Visual Studio Code next.

// I'm going to do the same. It asks, do you want to deploy an application? Select no here. You have not yet, logged in to Cloudflare in your terminal. So if you press yes here, it won't know how to deploy.

// So just select no here for now. Let's not deploy our application just yet. Alright. Open it in Visual Studio code. I'll see that.

// We'll do it for fifteen seconds, and then we'll do a poll, but I'm hoping it's straightforward. Again, the command server, npm create cloud flare dash dash name of the folder you want to store your application in, and then select TypeScript, do not deploy, and, what's the other thing? The hello world worker. I wanted to launch a poll. 75%.

// Seventy two %. Okay. I'm going to take a breather here. We can bake a bake early. Do you do you guys just need time, Or is it something else?

// Let me scroll to the bottom of q and a. Getting error. Can you paste the error? I'm going to repeat the process. You have to write npm create CloudFlare dash dash the name of your application.

// You can name it anything. And then select hello world worker and then select TypeScript. Yes. And that's it. And in the end, it lastly do you want to deploy?

// Select no. Oh, windows people are seeing cannot create directory. Can you run the command with sudo? Can you become the super user and then run the command? The commands again are NPM create CloudFlare dash dash name of your application, and then select hello world worker here, and then select yes for TypeScript, and then select no for what comes after this.

// Because do you want to deploy your application? Getting error. What is the error? Create Cloudflare not found in the industry. My kid didn't work.

// We're good. A few people are facing okay. The people who are facing issues, let me push this to GitHub. You can just pull this from me. That'll work here.

// So I'm pushing this to GitHub. You can just pull it from there. It's just some code that came on my machine. You can just clone it from GitHub for now. Eventually, I can share.

// I mean, you can eventually debug this. But for now, let me quickly create a repository and push the code there. Alright. So this is the link to the repository. Just download it locally.

// Click on the download zip button, unzip it, and open it in Visual Studio Code. I'm going to give you guys thirty more seconds, and then we will proceed. There's not a lot of code here, though not too much to go through, thankfully. But yeah, ten more, fifteen more seconds. Download, if it did not work for you, download this, open it in Visual Studio Code.

// Fifteen more seconds. Alright. Let me do the poll. 86%, eighty seven %. I'll proceed either way, but just post in q and a what the issue is.

// I don't think that'll work. You don't have to use Cloudflare, the command. Just clone this locally and open Visual Studio code. I'm going to proceed. Let me I'll take a break at 07:50, so let me just quickly share what a lot of this does, and then we will take a break.

// Alright? So you got some code locally, which is there are a bunch of comments here, so let's remove them. This is what the code looks like after you have removed all the, comments that were in there. This is very similar to the code that you saw when you were creating a worker from the UI. If you remember, I went here and this was the code that we saw when we were creating the worker from the UI.

// Export default, By default, export a object which has fetch as a function, which returns response. The same thing is happening here only. You have some extra return types because of TypeScript. You know, if you don't push it, I think you'll just infer the type so it should be fine. And this, if you try to run locally by running npm run dev, select no, Then it'll start your application on local host colon eighty seven eighty seven.

// This is just a way to run your application, which right now does nothing. As you can see, it has a simple route anytime someone visits the website, control should reach here and I will return hello world. I will not do any fancy logic. There is no app dot get slash users handler. Does not do any routing, does not care about the method type.

// Irrespective of what the request is, return hello world. If you run npm run dev locally, it'll tell you it is hosted on local host colon 8787, and you'll see hello world here. For the people who cloned the repo, you will first have to run npm install and then have to run npm run dev to start the application locally. So first, run npm install, then run npm run dev. And if you refresh your page, you should see hello world.

// If you change the thing that it it is returning here to, let's say, response dot JSON, and you send some JSON here without a new, So return response dot JSON message hide there, then you should see message hide there. It automatically reloaded for you as well. Alright? Getting very close to seven fifty here. I want to do one more thing, and then we will take a break.

// Were you guys able to run it locally for the people who were able to bring the process up locally? Let's see. 82%. Eleven %. Alright.

// I think it's break time now. So let's take a small break, of ten minutes. We'll meet back at 8PM. Let me look at chat. The people who are facing issues, which is like 20%, is it just time?

// If it's just time, this is your time. Try to build it. If not, I'm here to answer questions. Deepak, just clone the repo for now. You don't have to run the project locally.

// Are workers on cloud based specific or every cloud provider has something similar to it? Every cloud provider has something similar to it. Everyone has different names. Google Cloud calls it functions. AWS calls it Lambda.

// So yeah. Unsupported platform, Windows is oh, I don't know. I think it'll just, just clone the repo. Don't run the npm create command that I have. Can you try deploying the PTM projects you've developed on Cloudflare?

// I had deploying it on Vercel, but so far, I was only able to deploy the front end. Yeah. Then we'll have to convert the back end to a serverless back end, which isn't too difficult, but we can do it. Hostinger Bluehost charge for hosting services, but people still use them instead of serverless. Right?

// I mean, people lose it, Blue West. You don't have to use this. This is just for people use this then because a lot of times people don't know about serverless and if whether it's free and cheap. Two people don't care. It was $20 a month, $20 a month.

// I don't care. I couldn't find any free services cloud providers to deploy a WebSockets project. There isn't one. WebSocket has acquired persistent connections. No one's giving you that for free.

// HTTP people can still unless there is one. I don't know. But, yeah, that'd be pretty dumb to put that out for free. Someone said, okay. Any questions related to you not being able to deploy or, like, run the code locally.

// What is a worker? It is just a name that they have given to this specific service, CloudFlare Workers, because you're sort of starting a worker in one of these region, a small mini Node JS process, which is why it's called a worker. No other reason. Just what they've named. They could name it Hakuna Matata.

// Depends on them. Right? You're still not using rectangle. Oh, I am not. I keep forgetting.

// My bad. I will, eventually. Vivek, are you in the right folder? Nishant, are you in the right folder, or have you cloned the project locally? Do we have time to tinker with the LLRT runtime?

// At the end, we will see, let's finish all the slides, and then happy to. Does it I'm unsure what render.com is if they use their own run time or uses Node. Js. I'm unsure. Good question, though.

// Does the server immediately shut down when the request is complete? Not exactly. They start if request comes, they start a small pool, start a single instance, and then stays up for like a minute, two minutes, ten minutes. And then if no request is coming is when they stop the worker to make sure, you know, if someone is sending a request, probably a request is going to follow. If a request has come means someone has come to this website.

// If someone has come to this website, they're probably going to change pages. They're going to, you know, go through the website. So they don't immediately shut it down. It stays up, and then if no one visits it for ten minutes, it's then when they stop it, or, like, some time duration. Why learn Node JS or Express if you have to use a different run time like workers?

// Well, depends on where you want to deploy it. Right? As I said, at scale, you don't want to use this. At a smaller scale, you want to use this. And why learn the Node.

// Js at all if you want to use Rust eventually, depending on what you're using at the moment. Alright. So no questions related to Nishant, are you in the right folder? A lot of people are seeing missing script dev, which shouldn't be the case because dev does exist as a script here. So make sure you're cloned correctly and you you are in the right folder.

// Why does having server in other regions mean? What does having server in other regions mean? Why do AWS have servers in many regions? Can't it put all all of its servers in one country? What is the advantage of having multiple servers?

// This should be obvious. If I am in India, if I am in India, then I would want my server to be very close to me. Right? If all of my traffic is in India, then I would want to host my traffic here in India. I want to host my server here so that there is minimal latency to get my response.

// If they have a single data center here, then all requests from India will first go here and then you will get the response. Versus if you have a single data center here, or like multiple data centers, the people in India, a website like Swiggy can host their servers here. They don't have to host it in The US and vice versa. Application like DoorDash or Deliveroo will only host it here because they primarily have US audience. We primarily have India audience, which is why every provider will have multiple, regions.

// This this should be an obvious thing to know. Right? K? If you have a back end application, you don't want to have it in a single region. You wanna distribute it.

// You ideally want kiosk server is here also, is here also, is here also, is here also. So Australia people go here, US people go here, India people go here, so on and so forth. Are workers' software specific? Yes. It's just a name they've given.

// Like, workers is a general term, bringing up a worker, but this in this specific context, for example, Lambda is a term that AWS gave to their serverless back end or functions. Cloud function is what Google gave, and then these guys gave it workers. Can you okay. Answer that. Cool.

// Seems like no new questions. Let me do a quick poll on the pace. I feel like it's a little slow, but I could be wrong. So let me do a poll. And if everything is good, then I'll do a quick recap as well.

// 20% slow, 62% perfect, and 12% fast, 13% fast. Cool. Feedback taken, but I I don't think I can slow down further, but I will take questions at the end. Yeah, that's all I can say. I would urge you to follow along until then, and write the code that we're writing.

// Try to run it locally. Let me quickly check how many I mean, just try to run it locally, which if it did not work for you until this point, then first clone this repository, download it from here, github.com/edgekey./serverless with a single s, no double s. There is a typo here. Download it, unzip it, open it in Visual Studio Code, and then run npm install, and then run npm run dev and then follow along from there. Alright?

// Cool. Three more minutes before we start. Let me do a quick recap of what we've done until now. Number one, there's a bug here. I introduced what are backend servers, normal generic backend servers, nothing related to serverless.

// Then I shared what are serverless back ends. Why are they slightly better, at least initially? They are expensive at scale, but initially a great thing to get your application up and running without paying too much money. Famous serverless providers, the biggest one is Lambda. And then Cloudfield workers is a popular one.

// I've seen a lot of projects. I don't have the metrics on which is used the most, but if I had to guess, Lambda is probably used the most. When should you use a serverless architecture? When you want to get off the ground as quickly as possible and don't want to pay a stagnant fees of fees of $20 a month for maintaining a server that no one is hitting. Do you want to pay on a per request basis?

// For that, serverless is the ideal architecture. Then we saw how can you sign up on CloudFlare and quickly deploy a simple small worker. What is a worker? It's just the name that they've given to their offering of serverless back ends. Our back ends are called workers because there are many workers that we are starting.

// Then we saw the architecture. These are the many workers that they start, and then we initialized a simple worker by running this command, and that's it. That's all we've done until now. Two more minutes, and then we will restart. Let me fill up my water until then, back in two minutes.

// Alright. Let's get okay. Let's wait for one more moment. Let's always be technically right. We said 8PM, so we will start at 8PM.

// Okay, there we go. After initializing a worker and making sure it is running locally for you, if it's not, then feel free to follow along. But if it is working for you, which means when you run npm run dev and go here and you're able to see something, whatever you are returning here, there are a few things I'd like for us to explore. Number one, explore package dot JSON and its dependencies. The project that you've cloned locally has a package dot JSON.

// Every project does. Every node just process does, I guess. And here, if you look at it, the dependencies, there are no dependencies. There are no dependencies. There are no dependencies.

// Here what are dev dependencies? How are the different dependencies? Won't worry about yet. If you look at the dependencies, there's just one real dependency. These are just types.

// This is just TypeScript. Wrangler is the only dependency. What is Wrangler? This is the thing that'll it's it's technically the what is called the CLI of Cloudflare. What is CLI?

// It stands for command line interface. It is what lets you deploy your applications to Cloudflare. What lets you run your applications locally? That is the only dependency here. It does not have express as a dependency.

// If you write some code here, you never wrote app dot listen 3,000. Someone else wrote the code to bootstrap the HTTP server to actually start the HTTP server and route all the requests here. This is significantly different from how we have written code before where we own the HTTP logic, where we actually write we start an HTTP server, we own the lower code layer. Here we don't. Here we are, like, we have written a simple native function.

// K. My request will come here. This is what we'll respond with. We don't care about any of the app dot get logic yet. This we will eventually worry about how to do routing, but at least app dot listen, we don't worry about.

// Yeah. How do you start an HTTP server, we don't worry about. If you look at the dependencies, there is no HTTP server here. Wrangler brings their run time locally and actually starts the code when you run npm run dev. Cool?

// How does the worker start locally npm run dev? How to return JSON? This is the way to return simple JSON from it. This is a good starting point. We have to do a lot of things from here and build a proper back end application, but this is a easy way to start the project locally and understand it.

// Okay? Cool. Where is the express code, where is HTTP servers? CloudFlare expects you to just write the logic. Creating an HTTP server on top is handled by CloudFlare, and in this case, handled by Wrangler locally on your machine.

// How can I do routing? A good question to ask at this point is, sir, Kirat, okay, get get a question coming here, but this won't work in a real application. I want to do app dot get or app dot post. I want to get the headers. I want to get the body, so on and so forth.

// How can you write code like this if you want to run it in the Cloudflare environment? Can you do the same in the Cloudflare environment? Can you write code like this? The answer is yes, but not exactly. You cannot write as clean routing code.

// You can, we will see eventually, but you cannot use express. Why can you not use express? We will get to very soon. But you cannot write code like this. If you want to do this, this is the code that you will have to write.

// Try copying this and pasting it to your index dot p s, and let's try to explore it together. Oh, don't replace this part. Keep the export interface e n v here and then paste the code from the slides over here. Let's try to explore what this code says. I'm gonna give you guys ten seconds.

// Alright. What do did we worry about when we were writing express code? K. By what was the method that the user was trying to access? What was the route that that user was trying to access?

// What was the body that the user was sending? What were the headers that the user was sending? Query parameters. That's it. That's really what you worry about when you write an express application.

// Right? This request object here gives you access to all of these things. I repeat, whenever you're writing this function, this request object here, you can log the body, you can log the headers, you can check request dot method equal to get, then you return something, else return something. You can basically get access to what method the user is running or sending a request from. What else did you worry about?

// Headers worry. Query parameters, I'll show how you can get very soon. Anything else? The route. How do you get what route user is hitting?

// Have they hit the slash user route or have they hit the slash API slash v one slash user slash create route? How do you get the route that the user has hit? Request dot host. You'll find it somewhere in this request object. I haven't.

// I think it comes later on, but I'm I'm sure you can find it here. If you go to the types here, you will find a way to get, you know, the current route that the user is hitting. Let's see all of these and then we can, see how to get the route as well. Should be pretty straightforward. Let's start to run this project locally.

// Basically, all the code copied from here pasted here, npm install, npm rendev, and try to go to local host colon 8787 from various places. But what do I mean by that? Go here from your browser and it says, you sent a get request. If you look at the logs, you see a bunch of headers, you see the method, and you see null as the body because nobody was sent. You can send the same request via Postman.

// Let's send a post request and it says you did not send a get request. If I look at the logs, it says post is the request that is being sent. So my point here is you have access to everything. You do not have access to very clean routing like this, app. Get, app.post/xyz.

// So you have to extract all of these and do very difficult routing. For example, here you can do if request dot, get request, route Cloudflare workers. Request dot URL. Basically, this gives you as you can see, it's pretty convoluted to get even the route from this specific request, but there are ways. You can extract everything from the request and do very difficult routing.

// If URI equal to slash users, then handle the user request. So on and so forth. So your code will look very bad and be very hard to maintain. If you're writing code like this, we will see very soon how you can optimize it. But do we understand k, even the native fetch function that you're exporting from here, you can get access to everything.

// It is very hard to, you know, do routing here and as you have 20 different routes, you don't want to write code like this, but you can. Do we understand this bit? And can I proceed? We won't eventually use this. We will use a library that makes our library easy to do routing.

// But I just want to showcase, even without the library, it will work because this is how it was intended to be written. Eventually, libraries came into the picture that make our life easier. 86%, which is not great, but I will proceed, and I will take questions at the end. If you don't understand this one, it is fine because we won't be writing code like this eventually. We We will be using a library that'll help us do all of this.

// Alright? Revert your code to as simple as possible. You can return whatever you want from here. Don't worry too much about what body is written just yet. Let's try to deploy this on the Internet.

// Let's see if at least the first problem goes away. If you're able to deploy your application almost for free on the internet, and the way to do that is number one, log in to your Cloudflare account. So feel free to put whatever code you want here. Can be fairly simple straightforward. Log in to your Cloudflare account.

// The way to do that is n p x wrangler login. I told you wrangler is the CLI, the command line interface that lets you do a ton a ton of things with Cloudflare. One of the things it lets you do is actually push code to Cloudflare, push your worker to Cloudflare. For that, you need to first log into Cloudflare in your terminal, give Wrangler access to your account so that it can actually push this code over there. So for that, first log into your Cloudflare account using the Wrangler CLI.

// Why did they name it Wrangler, Hakeda? Ask the developer there, unfortunately, that is the name that they came up with. When you run this command, it'll tell you attempting to log in via OAuth. It'll give you a URL. You can copy this URL and paste it in the same browser in which you have logged in with Cloudflare, or it'll just open it automatically for you like it did for me.

// It'll give you a bunch of warnings. K. This is the access you're giving to your terminal. I'm fine with it. I click on allow.

// When as you can see, it says, you have granted authorization to Wrangler, which means Wrangler or this CLA that I'm running locally now can push this code to my Cloudflare account because it has been given access. It knows my password to my Cloudflare account is how you can technically think of it. Not technically true. It does not have my password, but you get the idea. After you have run this command and logged in, I'll give you guys ten seconds.

// I think you can run a few commands to check if you're logged in or not. But if it says successfully logged in, you're good to go. If you run n p x wrangler whoami, it'll give you the details of your account. Can you see your account ID? This is your email.

// This is the access that you have currently. And I do have workers write access, which means I can actually write to my workers. I can actually create a worker in my CloudFlare account. Ten more seconds and then I'll proceed. Alright.

// NPM run dev is the way to run it locally. If you run this, I see some response. The way to deploy it is npm run deploy, which under the hood runs the command Wrangler deploy. And since Wrangler already has access to my CloudFlare account, it can upload this code and actually start a worker on my Cloudflare account. So run npm run deploy or Wrangler deploy, and that should give you a URL where your worker is hosted now.

// Why is this cool? This is cool because you have a back end application running on the Internet for free for a really long time unless a lot of people begin to hit this. If I open it, it says whatever I was seeing locally, I now see on the Internet, I have been able to deploy my application on the Internet. You can use the same thing to deploy front end as well, a bunch of other things. This is the use case that we're dealing with today, deploying a back end application.

// Do we understand this? Am I good to go? Are you guys facing any issues? Okay. So it's 78%.

// Let me open q and a really quickly. If you have any questions, explain this part. This is what does this function return? Now why does it say promise here, and why does it have a generic which has response inside? Great question.

// This is a good question. What does this return? It returns this response object. Then, Harkeerat, you should have done this. Yes.

// You can do this, but this is an asynchronous function. Eventually, you will do some const user equal to await bb.get user here. You will get something from your database and then return that user here. Right? So this needs to be an async function.

// If it is an async function, it is not returning a response. It is returning a promise, which is returning a response. So that is why the return type here says promise of response. If you ever have a function, for example, let's say sum, which has to do an async call somewhere. Let's say it takes two numbers as input, but needs to do some async call first, await some DB call, and then returns a plus b.

// Then this will also not return a number. This will not return a number. This will return a promise of a number. That is a good question, and that is what promise of response means. Do you need it?

// You don't need it because TypeScript can just infer that you are returning a response, so you don't have to give it the type specific. Good question, though. Deploy command. NPM run dev. For the people who are see seeing website cannot be reached, it will eventually come up.

// It's just because so many people have run it. It's like how Node JS handles HTTP requests. Yes. The syntax is very similar to how if you use the native HTTP library in Node JS. Yes.

// Not able to log in. Can't you do Wrangler log in? What error do you see when you, run that command? Can you paste in q and a? Just going to look at it for two more minutes, then we'll proceed either way.

// Is response a generic? No. Response is not a generic. Promise does take a generic as an input based on what does this promise return. What would your work result of some domain be?

// Will it be accessed correct? Yeah. That is what it was accessible on. Right? Oh, great question.

// If you look at the final URL that I get, it looks something like this. My-app.kereftechnologies.worker.dev. This is my account name, or more specifically the email that I logged in with. This is what I have in package.json. If I go to package.json, the name of my application is my dash app.

// If I make it my dash app two and rerun npm run deploy, it will start a new worker for me with the name my dash app two. This is how it identifies what worker you are trying to write to what worker you are creating. Alright? This Cloudflare just so back end is not for everything. Steps after Wrangler login is as simple as npm run deploy.

// Oh, it did not deploy it at my app two. In Wrangler dot toml is where you have to change this. If you change this to my app two, then you will create a new worker. NPM run deploy now. I think it'll start a new worker.

// Alright. Either way, we'll proceed now. There you go. It says deployed, uploaded my app two because I changed this to my app two, and now it started a new worker for me. Now I have two workers running, one on my app, one on my app too.

// Alright. Let's go to the Cloudflare dashboard really quickly. So you can see the workers on the GUI as well. You don't have to, but, like, now you have a local copy of your worker, and you also have it running here. And as you can see, I have three of them.

// I have my app two. I have my app, and I have the original one that I created from the UI. Alright? If you want, you can go in here, and it gives you a bunch of things. For example, how many people have hit this specific URL?

// If I hit this a few times and go here, it does not show that. But, like, even if I look at the logs, if I say begin logging and if I go here a few times, it'll show me the logs if I did log anything. Oh, there you go. Get request, get request, get request, so on and so forth. So there are a few other things to know here.

// For example, how can you put environment variables? We'll get to them soon. But have you been able to deploy an application? Can I proceed from this slide? Do we understand how to run the project locally and also deploy it on CloudFlare workers?

// Create your own worker on the Internet? Great. 90% is beautiful. Again, at the end, I will take more questions. Let's proceed to the next slide.

// We have a few more things to cover. Slide number eight, deploying a worker. Well, that was straightforward. We've already done it. If you want to assign a custom domain to it, which means if you want it deployed on, you know, my app .hundredxdevs.com or API.hundredxdevs.com, there is a way to do it.

// You will have to pay Cloudflare, though. Like, you have to buy their minimum tier. You also have to either buy a domain here or you have to transfer your domain to Cloudflare. Cloudflare does not let you assign a custom domain unless that domain resides inside Cloudflare. So you either have to buy a Cloudflare, not a Cloudflare, a domain here, or you have to transfer your domain here if it exists on GoDaddy.com or something else.

// Alright? Eventually, if you wanna get it. Most companies don't even care, and, you know, it's fine if it is running on a URL like this. You don't have to, you know, have it on API.HonexDevs.com. But if you want to, you have to pay Cloudflare.

// You also have to transfer your domain over here. Alright? Cool. Adding express to it. Now comes the question of, this code looks so ugly here, Kirat.

// I don't want to extract the body and the headers and the, you know, query parameters and everything like we had done. Like this, this is too ugly. I don't want to do routing like this. I want a library like express that, you know, make gives me functions like app dot get, app dot post, so on and so forth. So why can't we just use express?

// And this is a good question I had when I started working here on a cloud head worker as well, like, like a year ago. And the answer is this, Express heavily relies on Node. Js. There is a bigger answer here if you want to read through it, but the crux of it is it's unlikely you'll see specifically Express on workers due to its deep dependencies on Node. Js.

// It heavily relies on Node. Js. Express did not even work on BAN, the other run time that's introduced recently. For the longest time, they had to do a lot of work to make Express work on BAN. Cloudflare has not done that work.

// For that reason, Express just doesn't work on Cloudflare workers because it uses a bunch of Node JS things that Cloudflare's workers don't have yet. As I said, they have their own run time. Their run time does not support a few things that Express needs. For that reason, they suggest a few workarounds. A few people have created libraries that specifically work on Cloudflare Workers and a bunch of other runtimes.

// You can use those. These are a few of those libraries. Again, there's a detailed answer here. You can split your Hadoop in a single file. Oh, You can split all your Hadoop in a single file.

// So the other suggestion that people give is, if because people ask, I have a Express application already. I want to move this application to Cloudflare Workers. How do I do it? Because UC Express doesn't work, but my existing application is in Express. I want to move it to Cloudflare.

// How can I do it? There they say, if you really need to deploy a Node. Js application by a Node. Js application, they mean an application that was written in Express and an application that was supposed to work on Node. Js.

// If you really want to deploy an application, I would search more for a classic serverless option. What is a classic serverless option? One that does not have its own run time. One that runs any Node. Js process.

// If you can split your app into smaller components and no need to have your Node. Js, Cloudflare workers are an amazing option. This second point is sort of important. They have suggested something like this. You might have expressed logic right now.

// It is fine. You have to eventually move to Cloudflare workers, so you have to write logic like this. Encapsulate as much code as you can into generic functions. For example, controllers slash user dot ts, controllers slash to dos dot t s, and do all your logic here, which is 95% of your code. The 5% of your code that's actually doing the routing, this is how you originally did it, this is how you can do it in the Cloudflare router.

// Only some parts change, 90% of your logic, keep it in a separate generic part which does not use any express so that, you know, it works here as well as it works here. That's what these guys, like this other guys suggested on a question as to why or how can you move an existing code base that was using Express over to Cloudflare. What did they suggest? They suggested, k, if you look at this app dot get handler, in the end you will get a user ID, Then you have to do a database call, then you have to return something. So they said, generic make your code as generic as possible.

// What does generic mean? It means pull out as much of it as you can into a file that does not heavily rely on Node. Js, that just does the MongoDB calls or database calls, does all of your rest of your logic, this will work in both Node JS and Cloudflare Workers. This part, the part that will not work in in Cloudflare workers, you will have to write twice, of course. Once for express and once for Cloudflare workers.

// But this is just 5% of your code. 95% of your logic, you can put together separately in a bunch of files, structure your application in a way so that you can easily move from express to Cloudflare routers if you want to. Do we understand this bit? Yeah. The two suggestions that people made.

// In the end, we will use a library that someone created, but oh, you don't understand this? Okay. What would don't we understand here? 80% understood. Looking at q and a, How can I install socket I?

// You cannot use socket I o in a worker. You cannot use WebSocket in a worker. Purely meant for x u t p. You rarely see any serverless WebSocket servers. Is Cloudflare Worker different on Netlify?

// It is different. They have their own run time. Right? So it is different. It is a serverless backend, but it is different.

// How Cloudflare Worker different? Okay. Answer that. Since top function is async, it will wait for await. Okay.

// Please repeat. Okay. I'll recap this slide one more time. The goal of this slide is to understand a lot of people when CloudFlare workers came, created issues. How do I support Express?

// What is the title of the issue? Express support for workers. Someone created an issue in CloudFlare. How do you support Express? I have an existing Express code base.

// How can I move it here? Because it is not working. They tried to deploy, it did not work. And people suggested, Express does not work. These are a bunch of libraries that do work.

// Use these libraries, you will not be able to use Express. That is the first suggestions that this guy gave them. And the second suggestion that someone gave them was, if you have an existing express application, then of course, you will have to rewrite it, or if you would have written it in a way, all your express routes had very minimal code. Your express route looks something like this, app.get user, get the user ID somehow from headers or wherever, and then do a database call which has most of your logic and then return the user, then it's very easy for you to move to cloud fed routers or cloud fed workers because you can write code like this. K, by fetch request came.

// Of course, you will do a check of is the method get, is the route slash user. And if that is the case, you will send a request here, get back the response. Not send the request here. Do a function call here, get the response and return. So they said you can move an existing express application over to Cloudflare Workers.

// It'll still be a big big pain in the butt, but you can do it easier if you write your code in a more generic way. K. Your database calls or anything that runs in both environments is separated out. The things that don't run-in both the environments is just five percent of the code. Cool?

// That's all you have to take from this slide. What is the biggest thing you have to take from it? Express does not work on CloudFlare workers. Alkiet, if it does not, what do you use? You use a different library called HONO.

// If you go to hono.dev, in the philosophy itself it says, at first, I wanted to create a web application on Cloudflare Workers. So this guy's motivation behind the project was cloudflare workers mein, the way to write code is really ugly. There is no easy way to do app Get or app.post, which is why this guy wrote this library. Eventually, this became very big. And this supports a bunch of runtimes now, not just Cloudflare Workers, but the initial motivation was just create a web application on Trailflare Workers.

// But there was no good frameworks that works on Cloudflare Workers, so I started building Hono, and I thought it would be a good opportunity to learn about something, yada yada yada. Eventually, this became very big. Now, Hono can work on Fastify, if you've heard of it, AWS Lambda. You can use the same code and deploy it in multiple places. These are all the runtimes that it supports if you're curious.

// Initial motivation was a good framework for Cloudflare workers. Eventually, today works in a bunch of frameworks. Let's see how you can start a hono application locally or like yeah. I'd call it a hono application just like we call an express application. This is a hono application.

// What is hono? It is your sort of routing engine. It's not exactly your HTTP server. It is your routing engine that routes the request to certain places, gives you an easier way to write code similar to express. Alright?

// Let's start by creating a fresh project now. The way to create a fresh hono project is npm create hono at latest, and then the name of your application. I'm going to copy this. Open terminal and paste it here. I'm going to name it hono dash app.

// You can name it whatever you want. Again, you can find all these in the slides. Npm create hono at the rate of latest, hono dash app. We'll do it for ten seconds and then I'll proceed. This will basically give you a basic boilerplate code in hono that you can deploy on Cloudflare Workers, and it's slightly easier to write code here because it gives you very nice routing.

// Alright. Press enter. Press y if it's not already installed. Select Cloudflare workers here. This is the important bit.

// Do not select any other run time. Select Cloudflare workers here. That is where we want to deploy our application today. And then open it in Visual Studio code. Alright.

// I'm gonna give you guys ten seconds. But if you look at this code, hopefully it looks pretty familiar and you have seen something similar in the past. This is very similar to express code. You see a bunch of red squiggles right now. We'll see how to fix them.

// Can you already guess what's the issue? We'll see how to fix them. But can you see code very similar to express? Akirat only has a single object here. Does not have req comma s, only has c.

// Yes. This is the syntax they used. You can get both request and response from the c, which is why it's fine. Going to wait for ten seconds, and then I'll proceed. Looking at q and a until then.

// Is HONO optimal as perform option as performance? Probably. I don't know. Haven't done a performance metric, but at the same time, you cannot write raw code. You need a library like this.

// Even if it's a little less performant, it's fine. Even though I am assuming it it's pretty performant. You need to install types. Yes. NTM install.

// Great. Great. Great. In advance, we're getting off topics. Project should I've taken a screenshot of your question.

// I will look at it later. What is server in simple words, and what is GoDaddy.com? Is it CMS Cloudflare? GoDaddy.com lets you do a few things. The biggest thing it lets you do is buy domains.

// Cloudflare lets you do more things, lets you buy domains, also lets you bring up servers. What is a server? A computer on the Internet, which is running your code. You should go back to the Node. Js introduction class where we introduced this.

// Alright? NPM install, guys, followed by NPM run dev. If you run NPM install is when it actually stalls the dependencies, and you get the node modules folder, and these red squigglies go away. Alright? The code might seem almost straightforward because we've done this before.

// This is very similar to express, only what things change. There are no two inputs here. There is a single input, and this gives you both, the request parameters as well as the respond parameters. If you want to respond, you can do c dot text or c dot JSON. And if you want to get what do you want to get here?

// You want to get body, headers, query parameters, middlewares. What what does this express give you? These are the big things that you want to get in an application, connecting to a database. If you know all of this, how you can do this in hono, you're mostly good for 99% of the use cases. How to return some data, how to get the body headers and query parameters, how to install middlewares, how to create your own middlewares, how to connect to a database.

// Sorry about that. Let's discuss these one by one. Body. Let me go back to the slides. And here is some code that'll give you access to.

// Body, headers, and query parameters. So if you copy this code, getting inputs from user, and paste it here, you will see it gives you access to the body, gives you access to the headers and query. This is just the syntax of how you get the body, the headers, and the query parameters. Let's test this out locally really quickly. But if you want to write it yourself, if you try to write it yourself, I'm going to wait for ten seconds or you can copy it from the slides.

// Either way works. What do we have? Access to the body. Await c dot rec dot JSON. Why did we have to await this?

// Because if you remember, even in fetch, when you send a fetch request and you want to convert it to JSON, we did await it. Because I don't know the good thing. I should probably know this reason. Why exactly whenever you convert something to a JSON, you await it, which probably means there is some code here that is run off the thread. Because this is the second time you're seeing this.

// I will Google this and let you know by the next class, k, bye. This is awaited. But here, it does expect you to await conversion to JSON and get back here in the body, and then this gives you the authorization header. If you need some other header, you give the name of that header here. For example, content type or any header you want to might want to access to, cookie, and then query parameters you can get like this.

// If you run this application locally now, npm run dev and start it out, again, most of the things are present where c dot request. This is similar to the request object that you had, when you were using express. Over there also, the way to get headers was rec dot headers. Here, the way to get headers are c dot rec dot header, and then the name of the header that you're trying to access. Query parameters, body.

// Hopefully, it's straightforward. Let me run this locally and send a request from postman. A post request with somebody with some query parameters, question mark param equal to two and with some headers or specifically, authorization header one, two, three. What all what all am I sending? I'm sending the authorization header.

// I am sending a query parameter. I am sending somebody. You can send all three of these in a post body, in a post request. And if I send this, it says four zero four not found. Why?

// Because the route was something else. What was the route? It was a gate request. Let's make it a post. Now if I send it, it says hello hono here, but more importantly, it logs the body, the authorization header, and the query parameter.

// Do we understand this? Do we understand how we can get all three of these things? Eventually, we have to tie this up into a full stack application, but for now we're understanding, do we have access to everything that we had access to in express? A few people did not understand. 80% did understand.

// For the people who did understand, try deploying this application. Maybe create a slightly more complicated application. If you want to explore CloudFlare workers examples, they have some very nice examples of workers here that you can look at. For example, how to return a simple HTML page. Some good ones here were I saw these these yesterday.

// There was like a YouTube thumbnail generator. Let's go to the tutorials here. Explore a bit. Give me ten minutes to spend with some people, or maybe, like, five minutes. For the people who are facing issues, can you paste in q and a?

// But why not make Express work on different run time instead of creating a new framework? That depends on the Express maintainers. They do not have the time to write this, which is why someone else came and cleared a new framework. If one has used Node JS built in HTTP module, it kind of is the same. Yes, exactly.

// And Express is also built on our HTTP module, so it means that Wrangler is also no. It does not mean that Wrangler is also built on top of HTTP module. In fact, HTTP module is part of Node. Js. It is not necessary that their runtime also has the HTTP runtime.

// Node. Js has worker support on the documentation. This worker and that worker are not the same. In order to load the value logins, this worker and Cloudflare workers is not the same. Just the name is the same, but the worker they're mentioning here is different from the from Cloudflare workers.

// Getting red squiggly on console dot log. You should also paste the code, but yeah. Paste the code. I shouldn't have you shouldn't have red squiggly. I'll answer questions for four more minutes, then we'll move on to databases because that's important.

// But any more questions? Unexpected end of JSON input. You are not sending the right body, sir. When you are in Postman, and you're sending body, you either don't have correct JSON here, you are either not passing in double quotes here, or you have not selected JSON here. So make sure you have selected JSON here.

// Make sure you have double quotes here. Does it not support API gateway struct like structure? I'm unsure. It does let you create multiple workers and lets them communicate with each other, where we define an API and attach a worker on it. No.

// I don't think it does let you do that. You cannot create in a single file, right, multiple routes which have independent workers. You will have to create multiple workers. Although I will tell you, in a lot of projects, there are 10 workers in the same project. So they people do tend to create independent workers, and your code base will have basically, you know, worker one, worker two, worker three like that.

// CloudFlare versus Firebase. CloudFlare. Difference between HONO versus Wrangler. Wrangler is the CLI. I can run npx wrangler.

// Who am I? It tells me who I am. Basically, it gets my Cloudflare details here. Npx under logout. It logs me out.

// Log in. Deploy. This lets me interact with the CloudFlare. This is a routing framework, a HTTP frame, not an HTTP framework, but like a framework that lets you do all of these things, app dot post, app dot get. And so this is like a framework that is a CLA, huge difference.

// Show the postman request. Here, I select post, I select question mark paramicolor something, I also give it. Yeah. No route is fine. Body, raw, JSON, and then headers meh.

// I added in header, a header. Even if you don't add it for now, it's fine. The point is, you can get access to these. Eventually when we write a real application is when we will understand how you tie them together. For now, we just want to make sure we're able to do everything here that we were able to do in Node.

// Js, or like in Express. Alright? With that, I will proceed, but we'll come back and answer more questions after we complete today's slides. Try to deploy it if you want, so run npm run deploy. And this hono application should not deploy on your Cloudflare, so you can just use it.

// As you can see, the name it's given it now is hono dash app, and now I can access it on hono-app.keerithtechnologies.worker.dev. With that, I'm going to proceed. There is one important thing to cover, and then I will answer my questions. Two important things. Middlewares and databases.

// Let's understand middlewares first. Creating a simple authic middleware or an authentication middleware. So here, thankfully the syntax is very similar to what we've used before. So if you want to create, you know, a middleware that lets you do auth, you can simply define it like this. App dot use and then the function that actually does all your authorization checks.

// You can also define it separately. Function, auth middleware c comma next. And you can do app dot use auth. You'll have to figure out the types here. I'm just using any for now.

// But you can figure out the right types here. So this is how you can use a middleware or create your own middleware. What is the most popular middleware we have seen until now? The authentication middleware. The middleware that makes sure that the user is actually logged in.

// So how can you create the authentication middleware? You what is it? It is just a function in the end. The syntax is different from express. What was the express middleware like?

// It was something like this. Rec, res, next. Would do the checks and then eventually call next. Here, what is the syntax? Again, you have access to c, which is basically stands for the context.

// Context basically means the context of this request, which means the request object and the response object together. And we check. If the authorization is correct, you will do the database validation to loop and different things here. And if it is correct, you call next. If it is not correct, then you will return to the user, k, you don't have access.

// This is how you can create a middleware. Can you pass the middleware to requests like this, Akhir? I think you can. I could be wrong. Yeah.

// So you can pass the middlewares like this, just like we did in express, or you can do app dot use, which means it will run for every request. Where should you use the authentication middleware? Probably don't use app dot use. You should use it on the routes that you want to be protected. I've written the code here which says, if the authorization header comes, then next should be called.

// If you remember from express what was next, it was the request should reach the next function If the authorization header is not present right now, I return right then and there, case top of this request, this request should not go to the next function. Do we understand this? Okay. Great. 85%.

// Beautiful. Great. With that comes the most difficult bit for today, which I'm unsure if you wanna do right now or if I do this again when I cover databases again, I still have to cover databases one more time from scratch. I can cover this then. I can cover this right now based on what the pool says.

// Yeah. Happy to do it either way. Let me create a quick pool. Should we cover this today or tomorrow? Today, tomorrow.

// We can cover this tomorrow and then move on to AWS afterwards. Alright, tomorrow it is then. Seems like a lot to digest. The next part is mildly, I wouldn't call it tricky, but it brings in a new thing, a bunch of like new things to learn about, specifically something called pooling connections, very popular thing, the way that Prisma makes money. If you've ever thought of how does Prisma actually make money considering it's just an ORM and runs locally on your machine, this is one of the ways it provides you what are called connection pools, which become important in an in an environment like this.

// But let's get to that tomorrow. Let's do a breather slash pause here, and let me look at chat and answer questions. Let me do a quick recap of all of today's class. Today, we understood let me share my iPad here. We understood Number one, what are serverless functions slash architecture?

// Why is it better slash worse than normal deployments? Then we discussed a few popular providers, AWS, GCP, Cloudflare. Then this is the one that we used. What is their offering called? It's called Cloudflare Workers.

// What is this? This is their own JavaScript runtime, which means they've written something very similar to Node JS or BUN JS, which are two of many popular JavaScript runtimes. They've written it in a very strict way, which makes it very hard for Express to run-in it. So you cannot take an Express application and run it on CloudFlare workers, which is why someone came and created a new library called hono, which lets you get simple express like constructs and deploy it on CloudFlare workers. And that is the library that we use today.

// It gives you access to everything. It gives you access to the body, the headers, the query params. It gives you access to, middlewares. It also lets you connect to databases. This part, we will do tomorrow.

// Everything else, we've done today. Alright? That's all for what we've done today. Now I will be opening chat and answering questions. Any questions first related to the section, like session today, and then we can get into more complicated questions.

// Alright. Trying from the top. Do we need to await the next in oth? I don't know. We'll see.

// Probably not. Do we need to await the next function here? No. We don't. But if you want to run some logic after the function has run, then you await it.

// If you want, k, first this function runs, and then some logic runs here, then you can await it. Otherwise, it should be fine. I think that is the case. Let me confirm. Postman, send request.

// Oh, npm run dev. Yeah, there you go. Hi gets entered. So that is the reason you might want to await it. Basically something.

// Before handler, and then after handler, if you want to measure how much every, how much time every request is taking, you can, you know, init time equal to new date, const total time equal to init new date, which is the current time, minus init time dot get time. So if you want to do something like this, if you want to measure how much time a request took, then you do something like this. Cool? Now if I send this request, it says it took zero point zero one five seconds. If I send it again, it it says it took zero seconds because it happened really quickly.

// So if you wanna do something like this, is when you await the next function, you await the main handler to run, and then you run code after it. Else, you don't have to update it. Alright. Good question. Okay.

// But, yeah, company job giveaways. Vercel now supports Express JS and Huno. Doesn't it make more sense to keep both front end and back end in Vercel? Yes. But have you seen the pricing of Vercel, sir?

// The biggest problem with Vercel is it's very expensive, especially at scale. You can keep paying them, but that's what these companies are competing on in the end. You can use whatever you want. But in the end, when you hit scale is when you will, you know, have to make a choice based on cost. And when that happens, you don't use serverless.

// How do how does the scheme scheme get judged? Would ML model output cost the same as a simple hello world? Or you mean how much the how do they charge? I think they charge based on execution time and the number of requests. One of these two.

// You can look at the pricing. CloudFlare worker pricing. You don't worry about this for the longest time because, you know, it's very cheap initially. But, you know, hundred thousand requests per second. I'm sure there's a time out.

// Every request can only run for five seconds or ten seconds. So that's how they charge. Is there any other libraries like Hono? They gave a few of them, which I mentioned in the slides, whoever was suggesting things. Then you can look at that specific section.

// There's a bug here, by the way, using hono. So these are a few libraries that this person suggested. Worktop ET router is something I've sort of used in the past, so you can look at these. Whether you're going to use HONO and the serverless stuff? Well, it depends.

// For example, projects.hanadexdevs.com uses a serverless architecture or a serverless backend. So it really depends on what the company is using. There are many open source code bases that use, worker. Like, the other reason I introduced this is because a lot of projects, at least the ones that I've worked on, have used Cloudflare workers. They do provide you some benefit on some auxiliary back end services.

// It's always just a good idea to delegate to, you know, some worker, doesn't have to be Cloudflare, but that's the reason that we introduced. The other reason why I introduced it, you can, if you want to build and deploy an application today on the internet, this is what you can use. That you don't have any overhead of deploying it. You don't have to worry about scalability. You don't also have to pay anything.

// So I wrote some code. Where did you deploy the to do application you used to give us? Oh, that was deployed on AWS. So the to do application I gave you was an express application. That was deployed on AWS.

// I want to take you guys through that. I wanna take you guys through that tomorrow. There are two problems with that. Number one, it's very hard for you to get an AWS account unless you have a very good credit card. You can.

// I'm not saying you guys, and most people won't be able to get into the AWS dashboard. I will announce that today. Try to get in, and tomorrow, hopefully, if you're able to do databases early tomorrow, I'll take you through AWS and how can do you how can you do a deployment on a real virtual server, on a virtual VM, virtual machine. That's what I deployed, the tool application. How authentication will be done?

// Do we have different groups? In Okta, we want to give access to some endpoints to certain set of groups and not to all the Okta groups. So here, the way to do authentication would be you will have access to the cookie and you whatever role you have, you might maintain it in a database and you do the authorization here, basically. You have access maybe you have it within house. I don't know if there's a framework that exists, probably not, that lets you do authentication out of the box in a CloudFlare worker.

// You will have access to all the headers, extract the user's cookie, figure out who the user is, figure out the permissions they have, and then, you know, limit access based on their permissions. Take NGINX and DigitalOcean. Is DigitalOcean cheap? That also is very hard to get in, I feel. I think we'll see.

// Let's discuss tomorrow what cloud pro does not matter what cloud provider you use. What we want to understand is how you can start a virtual machine and put some server there. But, yeah, we'll see what that is. We could use this solution, we could use Volter, we could use AWS, I have no preference. It's just that whatever, you know, you're able to get access to by tomorrow.

// When to start opens up a business zero to one? We have a few videos already in GSoC. Zero to one will only have GSoC videos. I have a few. I might introduce a few more, but you should go to the ad hoc section of ad.hundredxf.com, where you will find, a bunch of GSoC videos, which is, you know, the open source bit of this specific cohort.

// Why do you always await on JSON? Okay. Someone gave an answer to this. After the initial fresh call, only the headers have been read. So to parse the body JSON, first the body data has to be read from the incoming stream.

// Is that so? That makes a lot of sense. That also deserves a bounty of $15 to update. After so apparently the reason you have to await the fetch call is because you don't get the real body data, or you don't access the real body data until you actually call JSON, which is why it's still getting that data. And since it's streaming from TCB stream, it's asynchronous into the JSON.

// That makes a lot of sense. Why did next async in homo? I answered that. Right? I think I did that.

// Did I say homo? Oh, no. What is the advantage of YARN over npm? Technically, it's faster. There is no there are benchmarks.

// Whenever when YARN over npm. They sort of gave the benchmarks as to why it is faster. It does cache a few dependencies. That's why you want to use Yarn over npm. Can you explain Bob Martin's clean architecture model?

// I have no idea what that is. Is Bob Martin uncle uncle Bob the clean quarters guy? Let's see. Yeah. Yeah.

// Yeah. It is this guy. I don't know his clean. I've seen a few few few of his videos that are really good. Yeah.

// Someone created a sample application with homo. There we go. As you can see, someone created a simple website. Now why why is this good? This is almost free.

// This you can keep hitting this website as much as you want. And unless you reach a very big scale, you don't have to pay anything. This is why Savills is cool. So for a freelance project, we won't charge customer one time payment. How do we manage the monthly bills from the cows?

// Or you have to charge them recurring fee or deploy it on their AWS and make them put their credit card there. Use the code given on daily code, and I got this. So if you get unexpected end of JSON input, it basically means, k, you're trying to extract the JSON here. You're doing a c dot rec dot JSON await, but you're not sending in JSON. So in Postman, in body, you are not send you either are not sending anybody, or you are sending body that's not correct JSON, or this is not secured as JSON.

// So make sure you're sending in the right thing, and only then will it work. That's the that's what that error means. Can you please guide a bit about Azure Blob storage? I don't have any response to this. I want to create Versailles, but I don't have a Visa card, so I can't do r two.

// Sure. Not anytime soon is what I can say. That's a whole new cloud provider. But if it's free, it's very free, then happy to discuss. Just tag me after one week and forget this.

// What is popular framework for doing back end today? Is Hone use everywhere? No. Popular framework today for doing both front end and back end is the same one, which is Next. Js, which is what we'll discuss eventually.

// But, yeah, that's what that's what all of our websites use. That's what a lot of websites, good open source project companies are using. Everyone has delegated both front end and back end to Next. Working go working GoDaddy. Why we need to buy domains where they're originally originated?

// Where are the front end and back ellipse? Working GoDaddy, why do we need to buy domains where they are origin or where are originally originated? Oh, is your question how who decide decides who gets a domain? So all these companies that give you domains create a like, have a pool of a bunch of DNS servers. They I mean, there's a auction, there's a whole, like, auction mechanism here in how you can I I guess your question is, who decides who gets paid when you pay $12 for a domain?

// Right? Is that your question? Who who owns originally all the domains? Who has access to all the domains that you can buy them from? I read this a while back, and I think the answer is that all of these domain providers, which are like five foot 10 big ones in the world, all are part of a group.

// And these domain providers, like GoDaddy, Squarespace have to put a bunch of DNS servers all around the world, which is why they get this power of, you know, providing all domains. And where does that money go go to is a good question. The first time a domain is bought, who gets that money? I don't know the answer. I will Google though.

// It's a good question. I have two questions. Okay. Great. This is, like, what I like.

// Good structure. Firstly, you started to repost on LinkedIn. I started four, five questions each day, and every day was asking about joining cohort. Some of her beginners, mediocre, decent level. What should I reply to them?

// We are in week eleven. Oh, if a beginner don't join mediocre, two decent devs join, and if it doesn't work out, sorry. Let's meet up in Mumbai on fifteenth. I guess, minimum of hundred was around Mumbai. Minimum or maximum?

// Meetup is not possible. Catch up or hangout. I can do a ad hoc meetup on sixteenth. Fifteen time busy with someone. Sixteenth is a Friday, so we can do ad hoc meetup on sixteenth.

// I love the structure, by the way, guys. When you're asking questions, dump everything in a Notion doc. It's very easy for me to debug it. Put your syntax error here. Put everything you've done here.

// Cambly out. What did you change after logging to in CloudFlare? Initially, the layout was like this, and after logging, changed like this. I'm able to view video in full screen. I have no idea what I changed.

// I have no idea. I don't think I changed anything. PS second button on zoom full screen mode or something. Oh, okay. Okay.

// Okay. I have no idea what I changed. I think I was sharing screen either way, But, yeah, this was super helpful. Thank you for post posting a Notion doc. Appreciate it.

// If I meet no one, I will at least meet meet you Akash Ganesh in, Mumbai. How can I resolve this issue? Cannot find console. Cannot find the name console. Do you need to change your target library?

// Try changing lib compiler. Can you try this, sir? Can you go can you run this command? NPMI at types slash node and see if that fixes it. What is the advanced okay.

// Answer that. Should we use fast two and if it punctuates, outperforms express? Yes. Could you explain the parameter c using the function? Yes.

// So c usually stands for context. It basically means all the context of this application. What does context mean? In Hindi, it means everything of about this application, the context of the application. When you meet someone, you give them context.

// Right? I'm going Bombay to meet someone. I'll I will give them context. Okay. My name is Akira.

// I do x y z, yada yada yada. Context basically means it has all the context of the request, which means it has the request object, it has the response object, it has the headers. Everything about this object, you can get from this c variable, that is why it's called c, and you can call it whatever, you can call it rec and res if you want, depending on what you wanna call it. Generally, even in Golang you will see this very often, you know, the context is passed in into a function. And here context has a request object, and you can use context to send back data.

// That's what see means. Good question. Does AppRight? I have no idea about AppRight. Probably does provide some sort of runtime.

// Do AppRight for serverless architecture? Does this thing start likely logging? There is additional logging output above. So safe. Okay.

// Slow up. A lot of questions are repeated. It's so hard to just write it once, guys. I'll I'll read the question. Very boring subject today.

// I liked it a lot. I mean, the first time I saw this, I was like, this is I mean, this and Firebase, I like a lot for the same reason. Very easy to get a project. If you want to really deploy something on day zero, plus we don't want the headache of logging into AWS, creating a machine, and deploying it over there. This is a hundred times better than you're bootstrapping your application, which is why I think it is an important thing to do, especially if you wanna be a freelancer, give out, you know.

// So what I used to do, I didn't do this too often, but like a few clients what I did was, I deployed on Firebase and then charged them a recurring fee. Okay, by you, I'm hosting this on the internet, so give me $20 a month, $3 a month, and they would pay me like annually, $600 for the year, this is your infrastructure cost. And I would just put them on Firebase. My Firebase runs 10 different applications, I've only put 10,000 rupees in it once, in the last two years. In the last two years, it's still those 10,000 rupees are running.

// So that's why serverless is cool. Can you explain how CloudFlare architecture works again? Sure. Even though, like, I don't understand very well either. I just read this yesterday, but let me try my best.

// Where is it? Let's try to go through their docs only. There you go. How Cloudflare Workers work. Though Cloudflare Workers have similarity to JavaScript in the browser or in Node.

// Js, there are a few differences on how you should think about your code. Under the hood, work the worker run time uses the V eight engine, which is the same engine that Chromium and Node. Js use. The worker run time also implements many of the standard APIs available. What are standard APIs?

// Things like, you know, what is a good one here? Streams is a good one. Request response is a good one. Web crypto, if you've done some basic cryptography in Node. Js, is a good one.

// I would have hoped console also. So believe it or not, console, you do a console dot log. I think I could be wrong on this, but I don't have it as part of the ECMAScript standard. Console part of ECMAScript. Yes.

// There you go. Very nice blog post. Console dot log isn't in the JavaScript language. It is not part of the ECMAScript standard. What is part of the ECMAScript standard?

// Where, const, let, these things are. So that is what they mean when they say, we have used the V eight engine. We have also implemented a bunch of common web APIs on top. In fact, it has Node JS compatibility here, which is what I have seen express work in Cloudflare. I was saying this yesterday and did not, but I've seen there is a very too short way to run it.

// But, yeah, either way, very well. The difference between JavaScript written for the browser and Node. Js happen at run time. Rather than running an individual machine, the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the the very V eight specific thing. And what does it say?

// It says V eight orchestrates isolates a lightweight context that provides you your code with the variables it can access and a safe environment to be executed within. Basically, if I ask you to create something like CloudFlare today, you would most likely do this. If someone asked me to create CloudFlare today, I would have multiple mini Node JS processes running inside. I would not have a single Node JS process running with a very small isolates. But what is the right architecture?

// Probably this. You want to, if you want to minimize the number of, maximize the number of codes that is running, minimize the number of time that it runs to start an application, you want an architecture like this. Now what is an isolator is a good question that I did not know until yesterday. From a high level what I could understand was, an isolated is a way to run isolated code in the same Node. Js process.

// So a single process, but you can run various isolated code. What does isolated mean? It means, this doesn't have access to any of these variables, this doesn't have access to any of these variables, so on and so forth. That is a high level of the Cloudfield architecture. I also understood this yesterday.

// I did not ever read through this. So nothing x-ray no more than you, only little bit. Alright. How can I resolve this issue? Cannot find name console.

// Okay. Did did that work for you by the battery type slash node? Okay. A few repeated questions. I'm going to go to the end.

// Quick recap, post sign up records. Cloudflare sign up records. I'm assuming you mean a quick recap after we signed up into Cloudflare. So let's go back. Here is where I signed up into Cloudflare.

// First thing we did was went to the GUI to create a worker. I am not going to write the code locally. I will write it directly here. And we wrote it. Eventually, we said, how do Cloudflare workers really work?

// Sort of the score. And then we started to write some basic code locally. We started to bring a project locally and deploy it to the Cloudflare network. And Then eventually, we said, Kenny, this is very hard to do. Let's use a cleaner framework.

// And so we used something like Huno to basically write an application very similar to Express, that now we can deploy on a serverless network rather than deploying it on our own server. That is the final thing that we did. This is the high level architecture. If you want go through the video again. If it doesn't you don't understand it, let me know.

// As always, happy to do an offline video. Even though I think we've went fairly slow today, so we don't need one. What is the difference between cPanel, which is provided by Hostinger and AWS or the cloud providers? That oh, yeah. Every host provider is providing you a few things.

// Number one, compute. What is compute? A bunch of servers on the Internet. They have a data center. They have a bunch of machines there.

// They're giving you access to it. Number two, firewalls give you access to what you can access, what you cannot access. Number three, domain name provider so that you can host your application on www.xyz.com. Every application or a cloud provider has its they name it differently. For example, for compute, the name in AWS is easy too.

// Here, the serverless compute, that is called Lambda. Here, it's called workers. They name it differently in the end. They're all 10 different technologies. Whenever a new cloud provider comes with something new, the other one will follow-up and create the same thing.

// So so, yeah, high level it's just named differently. For example, you mentioned cPanel, which I've seen bohat paeli like in the in the past, which is like the dashboard of hosting or even good idea thing was called cPanel. Alright. More questions more questions. How does serverless backend work if you want to have our own dockerized SQL server?

// What does that mean? If you want to have your own dockerized SQL server, your dockerized SQL server will still be accessible over the Internet, no? Or do you want my SQL server should only be accessible by workers? If you want your SQL server is only accessible by workers, you give your SQL server access to you restrict your SQL server access only to the worker IPs, or I'm trying my best to why you asked this question. Why would you firstly, never an SQL inside a dockerized.

// You can. You can run SQL inside dockerized containers as long as you have persistent volumes. You're making sure your data is being persisted because docker containers are very transitory. It can go down, it can go back up. Let's say you're running it the right way.

// It is still running in a different server. Right? It is doesn't matter if the dockerized SQL or not. Running somewhere, your workers need to have access to them. Your workers can just access them how they would in a normal Node JS application.

// The only extracting they need is connection pools, which I'll discuss tomorrow, or it's present in the last slide if you wanna check it out yourself. Can I mention instead of a fake credit card, it works? Yes, you should. Tell me. Let me know.

// Let everyone know. How does serverless back end even work if you want to have our own dockerized application? What is that? Oh, someone else give a Notion doc. Love it.

// How does server if you want to have our own okay. Answer that. I can mention okay. Answer. You can.

// Someone push it to the Notion doc. Page not found. I have solved the theme bug, which occurs on refresh, but didn't get reviewed. Is it from oh, David. On I will look at it, sir.

// Not, I did see this. I'll look at it right after class. Please write download option from can someone add this? Can someone I don't know if there's an easy way to do it. Convert Notion pages into a PDF, and then download it, but if someone can add it, hundred dollar bounty.

// 200. 1 50. 1 50 dollar bounty, unless it's too difficult, then let me know if we can increase it. But I think $1.50 is fair. $150 bounty, given a track, give a button over here that the user can click, and it iterates through all the pages, puts them in a PDF, page by page or however.

// Ideally, you know, page one is the first page, and then all the contents of page one, and page two is comes, and then, you know, a bunch of pages on page two so on and so forth. So would be nice if someone can do it. One free dollars bounty. Try to learn to rest here, cover till module two, how much is okay for covering middle projects. Module two, let's see.

// This was very simple. Nothing. Nothing. Nothing. Nothing.

// Nothing. Okay. This is where things actually begin. Ownership and the book. And how ownership works in Rust, this is the bare minimum thing you need to know.

// And then, not needed. Not needed. This is not the best resource for learning Rust. Nah. At least cover until here.

// Then maybe go to what's it called? The Rust book. What is it called? Rust. This one.

// And then here, you should learn about traits. Go through this section, generic types, traits, and lifetimes. Basically cover everything until here. My Mac is an m one, RAM is 32 gigabytes storage is one TB, that's it. Twenty twenty three, partial cellular unemployed.

// Conhealing DevOps, and I'm in the cohort. Some say do do is not required. Some say not required. I'm also understanding the answer questions. Should I do this or not?

// Do it for an hour a day. Do it for two hours a day. Doesn't matter. Right? You can pull out two hours a day.

// Do it. Vercel converts both API routes and SSR pages into serverless. I have to do automatic conversion in Nextiva route as well as SSR pages to serverless functions with some logs that can automatically deploy. I wanted to make Vercel Nextiva's deployment service. And if I'm using services like NextAuth and PRPC, here we don't actually write any Nextiva's API routes.

// So how will it be managed ideally? And I want to have, I have no idea what how to go for a start pages. One additional query. I would, I would need to clear the API code from the build generated by next. So it uses serverless only and not the build code.

// I have no question. Is this, I know, I don't understand the question very well. Is it, do you want, is the is your question how do when if you're trying to build a cell and you specifically want to build the back end, which uses Next. Js for SSR and, API routes for back end. Is that what you want or something else?

// Or like, are you asking about, do you want to deploy do you want to deploy it on application next? Do you want to build Vercel yourself? Do you want to deploy application to Vercel? Do you want to build Vercel yourself? Can you put it in Notion doc?

// A question as elaborate as this should be put in Notion doc. Kirill, will we be building Vercel together in one to hundred? Definitely not right now, because it users read this bunch of things we have not covered. Don't want to overwhelm anyone. Oh, yeah.

// Exactly. If we recover it, we cover it in 100. When the project kicked out of nine side felt overwhelming. Do we need to write code in Node. Js, or do we need to write code in Huno?

// Okay. So you're writing JavaScript code. If you want to deploy an application to the Internet on CloudFlare workers, you don't have to use hono, but hono is the popular framework. I will create a detailed video or we will do a code along together where we use hono to create a real BTM like application that we deploy on a serverless architecture. That way, you might be able to understand it more as you write code.

// But, yes, you have to use hono. You you probably wanna use HONO if you want to, deploy it to a Cloudflare back end. You shouldn't write it without a framework. Can we debug the deploy code locally when it's running or on the dashboard? You can locally debug it.

// Of course, look at the logs. You can debug it here as well. It gives you a way to look at the logs. Ideally, in a serverless architecture like this, you want to log all the logs. I repeat, log all the logs or put all the logs in some sort of a log stash, so that you can eventually look at some other place and monitor all the logs.

// You don't have to go here and, you know, where is it? You don't have to go to the dashboard and look at the logs. You ideally want to dump all the logs somewhere. There are many tools that will let you do this. Data log is a famous one.

// New Relic is another famous one. Sentry is a famous one. And you can, you know, look at the logs there. You can still look at the logs here as well if you want. So if you go to, yeah, workers and select a certain worker, as I showed a while back, you can look at the logs here.

// Go to settings. No. Go to logs, and then begin to stream logs. But if you when do you look at logs? When you look at logs when something goes bad.

// And it's not necessary when something went bad, you had the logs open here, which is why in the real world, you put all your logs in some place. New Relic is one popular such framework. So this is off topic, but can you please make a video on a code along stream on WebSockets, not socket IO, for a month's stack application for getting rooms in a back end? Sure. At some point.

// This is like a very obvious idea we have to pursue on a code along. Every time I migrate a fresh project via Prisma or Postgres, I could delete earlier data because of drift detected, which is exactly what I'm seeing right now. Okay. Can't we connect two projects to one process? No.

// I mean, maybe. I don't know. But, yeah, I wouldn't I would expect to see that because it has a single migrations table, which is why if you try to do two separate Prisma projects on the same database, it will break. I'm sure there's a way to do it. Let's Google it.

// Two Prisma projects on same database. There you go. It was a GitHub issue. I'm currently running an issue. I'm working on Discord on the website of the bot and the APIs are placed with three different projects.

// How do I connect Prisma to database in each one? How do I have migrations over all three projects? Have you considered extracting Prisma schema and the general schema into an internal NPM package that can be shared amongst different projects? This should ideally solve issue. Another possible option could be to use a monorepo, but that could be avoided if you're not using it until now.

// I was using this problem. My solution, I created a private package. While it's on GitHub, all the projects that use the same database will have this package for sort of wow. So the way they have done it is or their suggestion is if you have three applications, you will still have a single schema or Prisma file that you will use in all three, all four of those applications, and you cannot yeah. That's the workaround that people have found.

// Seems like Prisma does not have a good solution for this right now, and this is a workaround that people have found. Okay. Let's see. Do we need to change even for the front end? What does that mean?

// In CloudFlare runtime open source for express to connect. The CloudFlare runtime is open source. For express to connect, what does that mean? Where, how to make old JS based, TS based deployed to Cloudflare. This app is created with a template, but older apps are not.

// Oh, if you have it, that's what we were discussing when we discussed moving from express to this thing. And the answer is, it's going to be a pain to do this, but you will have to basically migrate all your code. Right? What does migrate all your code mean? You will have to write all of this code again.

// You can try to reuse as much as possible. You already have some code that you've written. You have the database functions that link to the database. You have functions that do validations. You can reuse them.

// But this top level file, you will have to rewrite. The file that does the routing, you will have to rewrite, and, you know, copy over a bunch of your code here. Even GoDaddy provides a complete hosting service to after a subdomain to build a website and host on a server. Yeah. Makes sense.

// I'm getting internal server error in then an MPM dev. Can you share the logs in an ocean dock? It will be much appreciated. Where are we going to use this serverless stuff? As I said, if you're deploying an application or I will show you a few code bases that uses as well, if you really want to know where it's used.

// It's used like pretty popularly in open source code bases. Cool. Any more questions, guys? Wow. Lot of questions.

// So from the bottom, is it possible to week break before starting one two hundred? We'll see. Why didn't we change root there to source and it worked? Plus, we never compiled TSC. How did we or how did it work?

// Great question. You'll find the JavaScript code somewhere here. Let's see. That is a good question. Where is the JavaScript code here?

// Why did we not have to change the root there and the source there here? So even if your code is in src slash something, doesn't mean you have to put, you know, root dir source. Your final code can be to answer your first question, you your final code can be in this slash src slash index dot g s. Second question is, I give the Veritas JavaScript code. That is the good question, which I don't know the answer to.

// It is somewhere. You can never run a TypeScript file. But if I had to guess, it's, it would have either been here, which I don't see anything here, unless it's a hidden folder. Let's see. Wrangler state v three Cache.

// Nope. Good question. I don't know the answer. So figure it out and tell me as well. This is a good question.

// Question is, where is the JavaScript file for this? This is a TypeScript file. You plot on a TypeScript file. When I ran NPM run whatever, dev? I'm just this is going to be a difficult question to answer because, as I said, you only write this code.

// In the end, the HTTP layer is created by someone else. More specific. Oh, there you go. There you go. So if you run npm run dev, you will find temp slash dev dash a container that it has created for you slash index dot JS, which has all of your JavaScript code.

// Cool. Answered my own question. Why didn't we okay, answered that. Sir, I bought the code in beginning. I was caught up with work, just sending classes.

// What should I complete ASAP before the next JS? Just make sure you're able to hold the assignments as a session I give for people who've dropped off. Complete all the assignments. How much computer networking should a developer know? Any specific resource recommendation?

// Computer networking. Resource recommendation would be college books. How much you should know? Not a lot unless you're working in, like, you know, the network engineering team or something like that. With this noise, okay, can I apply for jobs?

// Just wait for Next. Js and then yes. If you can understand Next JS, create projects or more specifically, understand the code of either projects.hundredxapps.com or app.hundredxapps.com is a good point, where you can apply for jobs for sure. If there is no time in class, then please do deployment on AWS offline. We will.

// We will. If there is no time in class tomorrow, I will do AWS offline. We also have a video from last cohort where we did AWS end to end. So don't worry about that. Can you talk a bit more about how to handle issues of a cold start?

// Yes. There are two things you can do. You can either have a warm pool, which means you tell your serverless provider, keep at least one server for me, at the very least. I want k I will pay you $20 a month. Auto scale up and down, if there are too much traffic, bring more workers, but at least keep one worker up.

// Warm pool workers, CloudFlare. Let's see if CloudFlare provides you something like this. This is, like, this is a common interview question as well. Okay. How do you if you have a serverless architecture, how do you get rid of cool cold, what is it called?

// Cold boots? Cold start problem. How do you get rid of the cold start problem? Virtually no spin up time for the $5 a month plan. So basically, let's say if you use a $5 a month plan, there is virtually no spin up time.

// The free plan workers might need to be pulled from a central server of their low traffic, but generally less than total milliseconds. So this is what this is. They say, $5 a month, take the $5 a month plan, then there is no spin up time. Your server, at least a small one, will be running somewhere. For the free plan, it might need to be pulled off from somewhere.

// We might not be running it always, but it'll still be less than two hundred milliseconds. So that's what they suggest. And the other way you can get rid of it is, k, bai, I will ping my server every ten seconds so that there is always something that is up. If your provider does not give you a warm pull, you can just keep hitting your service every five seconds, every ten seconds. And that way, you know, you have always access to you have at least one server running at all all times.

// Redsquigglyconsole.log. Let's see. So you have to make the page public. You haven't shared the page. After deploying express to CloudFlare, we also need to change the URL fetch in the react application.

// Yes. Yes. You have to change it from local host to API.hundredxdevs.com or whatever your API route is. When is DevOps starting? So there's Docker, we have to do zero to one, maybe only do Docker.

// A little bit of this is DevOps only, specifically tomorrow the things that we'll do. Deploying a server, if we reach to that tomorrow in an offline video, that will be, DevOps and then Docker whenever we get to it. There's a very nice tutorial I have on Docker on YouTube, by the way, which you can look at. With the knowledge of Ansetthat, how CloudFlare pages are different from workers? Pages probably let you do front end, workers let you do back end.

// Is it practical to move Express app to CloudFlare or just no. So the thing is, you use this if you have a very big Paytm like application, you would not put that here, on Cloudflare Workers. What you would put is one small part. For example, a good example would be, notifications. If I pay you some money, this logic goes to an express server, but you're receiving a push notification.

// Sent you 10,000 rupees. That is probably something you want to put on a worker. Why? Because that's not something you care about immediately, number one. Number two, that part might is a little expensive.

// Sending someone a push notification is not as easy as hitting a database. You have to wait for, an external provider to be able to actually do it. If it fails, you have to redo it. So with cases like these, it makes a lot of sense to have a serverless function that is running based on how much inflow there is. There could be a lot of inflow.

// Let's say there is a message that I send on a WhatsApp group. Everyone needs to be notified. If I send a message on a WhatsApp group that has a thousand people, you don't want your express server to, in a for loop, send thousand people notifications. You want to put this in a queue, and you want workers to pull this from the queue. Worker number one will pull okay.

// I need to send an equation to person one, worker number two, person two, so on and so forth. That's how you, where you wanna use something like a worker. How much computer networking should a developer know? Any specific resource recommended? Oh, answer that.

// Credit card that might work. So there is this website that lets you get credit cards fake credit cards for AWS. Try to create an AWS account before tomorrow and maybe use this. Yep. And it has very weird ads at the bottom, so let me close it.

// Let me also bookmark this. Seems like a useful tool to have. Alright. Off topic. Why is this function not giving wiggly lines in TypeScript?

// Let's see. Console high for void returns. Good question. Let's debug. If I do something here, it says this.

// I have no idea. Can someone tell me this? $20 bounty. $20 bounty. Why is this not, no, $50 bounty.

// How, is this not giving me an error? Why is this not giving me an error? I hope you understand the question. Yeah. No error.

// Why is there no error though? What is the that is the var type. Give a detailed answer, like a good explanation that I can understand. Syntax is fine. Void is not a strict type.

// That is why. Okay. Let's do this. Oh yeah. There you go.

// That might be it. Void is not a strict type. So bounty goes to Javed Ansari. Someone posted type of widening. What is that?

// Oh, wow. Type widening and narrowing in TypeScript. There are many punctuation. Okay. It seems like some advanced TypeScript concert, but I hope you, that answers your question.

// I would go read this blog post and also void is not a stick type. That's why it's a good question. A good thing to know, I guess. Let's see. Copy.

// Well, I mean, if you put this in GPT, it'll probably tell you the exact reason, but these two sound right. Basically, if you replace void with string or number, it does give you an error. So it had something to do with void for sure. And I would agree with Javi and Sahi. Void is not strict.

// K. Probably does not care. I mean, the bounties done guys are only posting. May I joining delay, please tell me what I can do. I'm probably seven months.

// I can only say I keep your head down in work. Alright. Is this open? Okay. Getting console errors.

// Interesting. Cannot find console. Did you change your target library? Can you paste your TS config dot JSON here as well? Can you paste your TS config dot JSON?

// Is Cloudfield workers free forever until no. No. It's not free. However, at some point, you'd have to pay. If you exceed the monthly pay per request.

// Is Dial Field doesn't support express? That's the case for AWS? No. So AWS is Lambda does support express. I think you can write express code there.

// Can we look into r a b c in Node. Js? What is r a b c? No idea what this is. What yeah.

// What cell we should build later on? I think he answered that. Alright. I think he answered some questions. Any more questions before we call it guys?

// Okay. Last set of questions. No. Nothing. No.

// When can we do that cool login with SSH AWS you do for deployment? Either tomorrow or there will be an offline video probably from the cohort fund where we discussed this pretty well, depending on where we are able to get tomorrow. I would urge you to get an AWS account before tomorrow though, else it will be a little hard. The notion of can we, I'm curious about the reasoning why I'd take so much pain of rewriting my back end. You don't.

// This you do for small new services. You don't have to when do you use serverless? When you're starting a new company, a new website where you don't want to worry about costs from day zero? If you already have an application, it's running somewhere, you don't want to migrate. Any other solidify that support Node.

// Js specification? Yes. As I said, AWS Lambda is the most famous one that does support simple Node. Js express code would run there. In production, I'd pay anyway.

// Yeah, I mean, not necessarily. If you have a very small number of users that are visiting you, even in production you won't pay, or you'll pay very miniscally. But if versus if you have a non serverless deployment, which means you have a server somewhere, is when you at least have to pay $20 a month or $50 a month. That's not the big problem. The big problem is if you have a spike in traffic, how how will you auto scale?

// You have to write auto scaling logic from day zero, which, again, then you need a DevOps engineer, or you don't have knowledge of DevOps on day zero, which is why Solus is slightly better on day zero. Is Wrangler mocking the CloudFlare worker environment locally? Yes. In fact, CloudFlare worker environment is open source if I'm not wrong. I have seen this.

// Basically, if you have this code that we wrote here, you don't necessarily need this won't necessarily only run on Cloudflare. You can run it off Cloudflare as well. They've open sourced their workers, if I'm not wrong. I've seen that before. I'm not able to reach that specific GitHub project right now.

// But yeah. Okay. Cool. Off topic, we'll be just back end authentication like API keys. We can discuss API keys, very simple stuff.

// It's just another database where you store a bunch of API keys. Yeah, we can discuss it at some point. Not immediate priority. Immediate priority is Next. Js Docker, AWS deployments.

// That's immediate priority. Everything else is sort of being prioritized at the moment, and like building a lot of projects. We need to do all of this before March 15, because March 15 is when I'm hoping zero to one at least reaches a point where, you know, we officially the syllabus is done. We can do more if need be. But, yeah, that's a high level, but let's call it here, guys.

// It was good. I will see you guys tomorrow. Let's do some basic oh, there's some bunch of Notion docs already. Question. Okay.

// Question. Need your approval for issue number six on CMS. Do it. I mean, I'm not oh, okay. Let's see.

// The problem is, I mean, we can't do this. The problem is the purchases logic, right, is handled by a provider right now. You can try it, create a new purchases table, put the purchases there. But it'll be hard because, you know, here you have to know a lot of things, which are not something if you'd expected to know because a lot of this is, you know, the purchase bit is outsourced to whoever owns this website, which is why it's going to be a pain in the butt. But yeah.

// Cool. Let's call it there, guys. I will see you guys tomorrow. Bye bye.