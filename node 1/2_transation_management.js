// how to prevent rerender
// 1) pass state to child components
// 2 ) memo() let us skip re-rendering when it's props are unchanged (even parent rerender but not which's props are not changed)
   

// const user =await User.find({
//     $or:[{
//         firstname:{
//             "$regex":filter
//         },
//         {
//          lastname:{
//                 "$regex":filter
//             }
//         }
//     }]
// })


// if you creating payment base application you wont store float in database you won't store 88.88 data base you will store 8888(888777complete integer) and you will that number of decimal places for our application is 2. so 8888 in data base actually is 88.88.

//  there are precition issues in javascript as well as in database so that you do not want that  

//  balance

// if user 1 has 1000 rs user 2 has 20 rs your net balance of 1020 rs in your paytm back  
// paytm have to make sure that the sum of all user balance of it's actual balance of the paytm
// if user 1 is  sending 100 rs to user 2 and if patym server patially fill this request (there can be multiple senarios)
// 1) paytm server add 100 rs in user 2 acc so it become 120 but it forgot to debit yours so you still have 1000 rs in your acc now paytm back does not have this much money(and this should not ever happen)
// so that this transaction need to be vary safe. 
// you need to make sure that if every thing happens or nothing happens if database goes down or something random happern in middle. you need to revert the hole thing mean if user 2 get the money and it is not dabited form your acc then role back hole thing trnsaction

// let's say i introduce the function transferfund which has three inputs fromAccountId toAccountId and amount that you need to send (photo 1)

//  in above code if node server or database dies for a while we may have inconsistant balance 

// wo we have to wrap code inside somthing called trnsaction  so that it ensure that this transaction happens fully not partially (and enven put checks if balance is lass then 0 or it is not saficient the person want to take)

// senario 2 ) what if two request come same time from same user to send 2 users to 20 rs (here im tring to full the server) if there is if check i have only 20 rs but i send it two person at the same time  then above if check might fail because it check balance same time and send it to both the user

// so here we have to woried about 
// 1 trnsaction sould not complete partially
// 2 if there is if check for balance checking then first transation should read it first and second second not at the same time. while first is reading, second should not read it

// see photo 2,3,4

// steps
// see phto 5 ,6

//  how do you do transation in mongodb

// see phto 5,6,,7,8,9

// create setion that allows you to do bunch of things togather  see phot 10 
// mow if people send concurrent request they won't be able to full us due to sestion

// dont do photo 11

// 