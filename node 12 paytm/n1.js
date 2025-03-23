// you have to track very havily when you send and recieve money hdfc (see pic 2) that money is reach or not to bank beacause you have to relay on external service in this case external service is hdfc bank api

// here in paytm we have 2 thing frontend backend and db now when you make the payment you got redirected to bank page and when payment get success you get again redirected to your app page but here we need somting called webhook to listen our bank continueslly is payment got sucess or not, because otherwise user directly open payment success page and tell your main backend that i did payment, or sometimes while payment is being done user referesh the page, then transaction may have done but our user does get know that why we need webhooks that continouselly listen to our banks and give update when transation get success of failed or money is debited to your paytm acc (see pic 3), this hdfc api may told you two times that we give paytm 200 ruppes even you send one time, so do not update in db twice, how you check that using session id 

 // 1 more quetion is why you cereate seperate backend for this webhook beacuse it is direactly talking to bank you do not want it like it goes down that's why 

// 
// 1 more thing people what is thay may want to send money to there hdfc back they say we do not like your service any more
//(see pic 1)  here 1 thing you can do is hit hdfc endpoint for if and success or filed you show that to user, here when you hit end point that also written web hook and when your paytm money reach to hdfc back that webhook update you in either cases weather it suceess or failed but in these two cases we do not have any problem because we get responce back but it may happen that this hdfc service may get down(because these service is anrelayable) in that case you want to retrying it in that case you need another service , we call it withdrawal service it's job is very simple if someone has asked for withdrawal then this withdrawal request sit in a queue and it ping the request to hdfc server if it get success then update the balance in db but it get faild in taht case add that agian in queue and after certain time try again (and this service again one webhook)

// one more senario is if user click on pay button twice for 200 rs and in your hdfc back balance is only 200 the both the request directly go then is problamatic if both the request get pocess together so for that create queue and service piced up 1 requst not other service can peek up that request form queue utill it does not get success of faild (see pic 5)

// Notes
// process 1 request at time




