// connection polling (serverless backend)

// in serverless backend we hot our app on cloud front, and it has it's own express workers for serving our backend and now assueme it has 100 diff location where there workers are running and those 100 diff workers has connection to your db and you database (postgres) has limit on the max number of open connection they have (see pic 1), so if you are using server less backend then you have limit on the number of connection with db so this approach won't work


// see pic 2
// instead of directly connecting individual workers to db directly we maintain connection pull as you see in db and from pull to db we have only one connection this works better then above because above we had 100 workers and 100 db connection which might not our db supports 

//  see pic 3 how to use this approach it say create conncetion pull do not directly coonect with db