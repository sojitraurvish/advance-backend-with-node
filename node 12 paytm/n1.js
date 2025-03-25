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

// how do ptp trnsfer (phone to phone transfer) you can send money to someone's phone number
// ptp mena mean pear to pear transfer one person on paytm can send money to other person on his wallet

// what if your webhook server is down for 10 days the your bank keep hitting your webhook and at the end it refunud you money, it will keep hitting your server utill it do not found this success captured (see pic 13), and if i do not happen in next 7 days(your web hook does not get called) then bank will refund your money, and you can see keep retring histroy in plateforem's dash bord like rezorpay

// etl pipeline in aws, if lot of request will comes and updated ne data then use this pipeline and create new data and and use it for next 15 mins and and do same process

// use normal data base put all the data, leter on you introduce serch based on username then dump that data in elastic search and start using it for search
