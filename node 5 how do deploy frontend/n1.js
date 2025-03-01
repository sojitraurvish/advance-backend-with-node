// how to deploy fontend react project on aws

// because as compare to varsal aws give you much more discount at scale

// distribution and storage

// distribution 
// if we have website like youtube then we have lot of .mp4 file that we are distributing 
// if we have website like pintrest you then we have lot of .jpg,.png file that we are distributing 
// when you visit normal website it sends you html and js file
// so when you visit any website it sends you some files all these files that are not store data base that are objects but what is the standrd practice these objects on the internet, aws s3 bucket
// so you will store these datas in object stores aws it s3 - simple storage 3 

// you store the data in s3 it give you url and if you give this url directly to someone it is bad practice to da that and it if give it they won't be able to access it so i have locked it so i have distibuted my file in certain way and what that way is 
// for that we need to understand the jargon called CDN content delevery network 

// storage (object stores)
// distribution CDNS Content delivery network

// i have uploaded one file someware may be the server in america in awa so i got one url (earlyer i said you i will not access that file direactly i will access it via CDN), when people access so the first request go to usa throw CDN link and it send response to cdn and server to user but here after first request cdn cash it there in his server, and now when the second request comes for the same file it will be servend from cdn not from the usa server

// could front (cdn of aws), mean i will sit infornt of cloud and let you create a cdn, what does it mean let me open an existing one, it is saying this is the distribution (cdn)url link (Phto 1), and what does it point to look at origin and it says i point to (the url aws s3 given us) (see phto 2), what does it mean it means after i create my s3 store, then i create my cloud front distribution and i told clound font your soruce is this url(s3 url) and clund front gave me url, now whenwever i go to the url that cdn give me, it knows that it point to this s3 url, so it get the source of file from there, and do someting extra, 

// big picture
// aussme i have uploaded one vide in s3 and the server is in usa, and cdn server are distributed all around the wold, aussme i am in india gujrat surat , cnd has two server in india one in rajkot and one in deli so as user when i request that file form surat then request first go to nearest cdn request i mean to rajkot cdn server and from then because cdn knows the actual url of my video it fetch it from the  server in usa and server to the use and cash it when ever second time user requset then it served form cdn cash and it get chashed there for center hours untill the frequent request is comming for that file  

// CDN creates pops (point of presence) - > cdn server called as 

// so you need both the thing 
//  object store         and        CDN
//  for storage                     Object distribution this charege meoney based on request
//  this charge you for storage

//  and both charge you some money 

// but both is required otherwise your each requset to access oject have to travell lot and users get lot of delayed

// CDN, Object distribution this charege meoney based on request and suppose in india cricket mach is happning so you are storing entire futage some where and from there multiple pop is accting live string so lot many people is watching it will cost you lot, so you do not need to use aws cdn you can use any form where you get benifit, but you can still use the s3 as your cloud store 

//   that all the high level overview about cdns

// but if forntend is serverd via cdn then why not backend very simple ans is every one have diff data when you request your profile data every once have specific data, so this is not make sence what make sance is edege networks mean you deploy your backend system at multiples places and when user request for data so that request will be served by the closest edege network server but why can we do this same thing with the object data we host or put aur data at multiple places then we do not need cnd but it will too costly to do that you can copy single video at 32 places that's why it too expansive that why we use cdn and if we do not use cdn the user face latecy

// so now learn how to deploy font on aws and this approch won't work with the framework like next.js which use server side rendering, this will work for busic React app, or the app which get conveted into busic html,css and js 

// step 1 (ptho 3) get s3 and cdn acc
// setp 2 (phto 4) building our react application with npm create vite@latest if i want to server my build folder locally without react user serve page or exrpress to serve all file with out it it won't run and give you path erros 


//  here our all html css file are going to be same only for all the users so why not to take cdn approach here see (phto 5(ec2 approch), 6(cdn approach)), same thing as above all the fils are in object start but when you first request it goes to pop then to object store and cashed in pop for futher requests for same page, but why not to use this approach at backed (see phto 7),video about hotstart live stream casking via cdn

// go to s3 and create new bucket 
// check - bloack all bubilc access checkbox all won't give any or black all the access 

// so now form build bolder i will cpoy every thing and putin inside s3 buccket (see phto 8) and this is how your file should be not inside the folders and index.html should be at the root leavel now let's connect it to cloud front 

// stet 1 -start and create the cloud front distribution
// stet 2 - give access to cloud front fo you s3  

// see phot 9
// setp 2 -detail) the way to create it go to cloud front, click on create distribution , add url here if you are using diff company s3 or just selct the s3 butcket url which you have created(in simple term add the url which you want to cash), second you have to add is origin it any men right now in s3 we have uploaded evrty thing on root but if we have added all thing inside dist folder then we have to give this dist folder as origin i mean we have to give path
// origin access- is your origin open public or is there any access control over there like we have bolcked our s3 url so there are 3 option first is public, second is origin accsess control setting this mean how can cloud front access to you blocked s3 url, we go with this second option so when we create on create new OAC(create new origin access control that mean i will crete new policy that how cloud fount can access our specific s3) btn (see photo 10) , give it name you want, select sign requests and cleck on create, so here i have told that i will give you access of my s3 so here it will give me popup that must update the s3 policy and give me access and to da that at the end of the process i will give you the file that you put in s3 to chagne it policy and give accces to could front that that's what this worning says, evryting else will be defalut , check and enable enable security protections option, then give default root object (why - our root file is index.html but i do not give anyone like domain/index.html i just give domain) so in this option i will provide domin/index.html and it mean if somebuddy access my domain then this index.html file will be serverd, so in this option write index.html, then click on create distribution and now it will give you the policy (see phto 11), so you have to go to s3's permition page, after you reach to permition page there is bucket poicy where you can see public access by defalut black if you want to add new policy you can but by default evry perimition is blacked, so click on edit btn and copy the policy from cloud front and past it here in s3 to get access from clound fornt (see phto 12), so still s3 is blocked from every public access but due to this policy it is open only for perticular cloud front distribution so that's how you can get acces for cloud front, so now if somebody want to access this website then they always come via cloud front, there is not other or direct access s3 way to access it (Note if you have s3 and could front of diff conpany then wen you add policy in s3 then you have to change the id of your cloud front),

//  still you do not want to give url like (phto 13), you want to give then url like somting.com not the rendom stiing that cloud front give you so how to link the domain with it 

// when you access you side via url given by cloud fair the you get index.html file and if suppose that file have two more file like js and css so it is also get access through cdn only

// in cloud front do bellow ot link domain with your site

// now let's link domain with it

//  you can do it while you are creating distibution as well 
// or once you have created you can click on edit here(see in phto 13) then you get option to add your domain there so add you domain if you own(because you have configure there as well), then it gives the option to add ssl sertification (if you want your website will be serverd via https which you should),so here one question is that the url which cloud front give you which is already https then cant we link directly with domain and our website will be served via https why i would i have to create new certificate, the answer is the amezon can create certificate for a rendom domain, certificate only can be created and deplayed if you actully own that certificate so you have to show amezon the ownership of this url(phto 14) then amezon will craete certificate for you, you can create cerificate by your self, you can by from go dady, or you can ask amezon to create it but it is not free, to do it via amezon click on reauest certificate button and it will take you the another service of aws called aws certificate manager and here you can request for a certificate (pthta 16 ) click on next and domain name for which you want the certificate select dns validation here(mean how will tell aws that you own this certificate), select the decrition algo(see ptho 17,18) and click on request, (pthoto 19) on dash bord you see pending that mean you ask aws to crete cerificate, but has not able to yet, why because how does it know that you own this certification you may have written facebook.com so you have to verifi that you own this certificate, fot that go whereever you have bought this domain i go to google domains, fisrt it will show me the list of domain that i have purchased, selecte that you want to link with certificate after selcting  go to DNS tab over ther i can actually add records where does this domain points. click on edit button add here new reacord that amazon tells you to do(phto 20,21 create this cname record in your DNS section in your that perticular domian service to verify the certificate and tell cerificate service that you own this domain) after that amazon will hit this entry and verify you certificate for that domain that it got to know because you added the sub domin entriy and that how it will verify it and generate the certificate for us, now if i go to cloud from i am able to see my certificate (see phto 22)  so i attach this cetificate and click on save chanegs, and this will tell cloud front that any request comes from this domain then you will have to serve this s3 bucket files, right now my cloud front domain is working but my actual domain is not working when i hit that, so i told my cloud frot that any request comes form this domin but i did not linked my domain with cloud frot domin that why it is not wokring simple, i added entriy for certification in my dns server for subdomain but it was for certificate,  i have to add another entry to link cloud front url or domin with our actual domin and this entry i have to and in dns section for my sub domain via which want to access cloud frot domin or url (see phto 23,24) i have added it for my sub domin but you can also point that to main domin as well so that was the last thing i need to do wait for while and hit your domin your website will be wokring

// but there is one problem here when i have dinamic website and i try to hit dashbord route(photo 25) it will giveme this error mean it is not accessable, so our s3 or cloud from should always retun index.html no meter what you put in url like domin/dashbord it shoul always return index.html and then our react app will take care about routes for use but how to achive that(see phto 26 of erro page),  and all requet should go to index.page (phto 27), so we want that when your type the page that does not exits like dashbord it should not get these kind of access denied message insted show some error page and you can add that in cloud front it self ,(see phto 27,28,29,30) and instead of returning error page i want whenever they get 403 i want to return index.html page and then your index.html will serve that dashbord page if it exitsts(with react router dom if you are using) but i want ot alwasys server index.html whener i get 403

// (see phto 31,32)
// one extra thing you have to do is create invalidations, what happens is the primary perpose of cloud front is cahsing so the lot of these data is cashed so is domin/dashbord is exits then response ot it cashed and to make sure you are able to remove the cash response, and to make sure that you are clear the cash you can create called create invalidation which mean invalidate the cash does not matter what the pop is but invalidate if from everywhere so when user visite doain/dashbord then cashed value does not come new values comes(this mean values not the page values inside the pageimage.png) if any page data get cashed and served to other user or if i visit the same page and i get old data that's worng that way i have to do 


