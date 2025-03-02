// how to install docker and run comma in pic 1 if it  not woking than docker is not woking 

// without docker pic 3
// with docker (pic 4) 
// if you start index.js on port 3000 in docker contener then it runs indipedently your moachine do not need to care about that
// it means inside that contaner it is using port 3000 not of my machine
// if i hit localhost:3000 in my machine then my request will not reach to my docker container (pic 4), this request is like nothing is running on my machine on port 3000 someting may be runing mine computer in my machine but not in my main machine that what container help you to do, it helps you to isolate the code, it says this code is running but it is running indipedently in small machine inside your big machine, in my big machine still i can run one node process in