// see pic 1,2

// you can also limit them at application level
// limit the request at one level above it at load balancer lavel(with cloud fair proxys) so if some one seeding 1m request that wan't reaches to your actual server

// (see pic 3) in case of dedos rate limit won't work you have to do somting else because hacker have 100 of server if you rate limit 1 server 2 start sending so for ddos we do someing else we see it latter on

// condition of rate limits

// ip of the user that this ip is sending a lot of requests so let me block it

// there is one down side of putting rate limiting at ip so in my collage if 500 people conncted to wifi they use to proxy the request so out side word use to get single my collage ip which is 10.10.889.0 so there was one web site where they put check on ip so if single persen do lot of request then request goes by this public ip 10.10.889.0 so if after certain requst they block our ip then no one in campas could access that website and same thing for if i and my nabour share same public ip then also same senario happens

// so above thing has down side the what other conditions on you can do rate limiting on you can do it on user_id level  

// comman place where you sould rate limit(see pic 4 )

// cretiria
// the hole app should be rate limit at some point bello
// a single ip => 100 req/1s or 30s 

// but some endpoints that should be aggresively rate limit (see pic 4) specially password one,otp one for login

// instead of sending request sequencially(one by one it is very slow and if we do this then our process run out of memory beacause lot of pending promise in our node js memory) you send 100 request in patch what mean patch(see pic 5) see this code in week-20-pentest folder -> this code says first 100 complets then next 100 (see pic 7)

// you can wite rate limit logic by your self also(see pic 7 get user ip from request) but you can also use extenal library it will give you 10 diff tings

// use this library for rate limit(see pic 8)

// see pic 9 -> time for other endpoints and cruicial endpiints with (pic 8 library)

// now ddos (see pic 10,11)
// to prevent ddos 1) capcha
// (see pic 12) 2) proxy your request via cloud fair and cloud fair will figer it out  is it legitimate request so your request can not directly reach to your server it first goes to cloud fair but to do it you have to buy your doain from cloud fair or you have to trasfar your domain to cloud fair beacuse to redirect your domain to your website you will add your server public ip in domain not cloud fair then how cloud fair become middleman that why 
// if you turn on this proxy option it will handle this ddos by it self( see pic 13)

// how to ping ip(see pic 14)

// react libray for capcha(see pic 15,17,16,18 ) see pic (19 to veriry capcha token from bacckedn)

// to generate otp people mostly use math.random function but generating otp like this you have to store in db(so evnetually you have to hit the data base) and to avoid it now people usallly use called google authenticator, how it works 