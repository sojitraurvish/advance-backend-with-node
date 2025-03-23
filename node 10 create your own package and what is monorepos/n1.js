// before mono repost introduced earlier people used to create frontend and backed in same repo like this
// /app
//      /backend
//      /frontend

// monorepos 
// why packages and modules (see pic 1)
// why to create common folder - the dependency requred at both the place that we put here we can directly import it from backend folder bit it makes our code little massy that why (see pic 2,3)

// but how this code share happens when we did not have the mono repos 
// the ans is publishing this common folder as package on npm js , generally we do not share types but here to just learn but assume you have some date convertions funtions that is required in bcakend and frontend both so you can create module or package
// why you do not imoprt types form comman folder to your frontend folder, 1 reason is your typescript compilar will start complaing, but you can fix that by add some config in ts.config file 

//  no let's see how we con create this common folder as npm package
// create account on npm js
// then do login from terminal(see pic 4)
// give name name to your package in package.json file "name":"<@your_name_user_name>/<unique_name_that_pageckage_name_not_exits>"
// give verstion number
// and change your main file "main":"dist/index.js" we do not publish our typescript code because that create problem and do not pushlist it because it keeps you code safe, but then how our user will get typescript if they want to use that we we do letter on 
// go to ts.config and add "rootDir":"src" and outDir:"dist"  

// to pubilsh the repo   
// npm publish --access=public - your package is published, you can also publish as private

// to show what you pubilish when you run above command
// cmd npm pack 

// it will show you the commpress file which shows what goes npm 
// but it includes index.ts in src folder i just want to share dist, package.json and tsconfig.json file
// and for that create .npmignore file and add here src here because you do not want to send this folder
// now run cmd npm publish 
// but it will throw this error called - You cannot publish over the peviously publish versions so run chnange the version no in package.json file version:"1.0.1"

// now install this package in your frontend and backend 

// but when i use it in my server folder i get typescript error(see pic ) - how to fix that 

// you might have seen the files call .d.ts which containers only declaration mean only types of your js file but how to create that you have to enable one option in your tsconfig.json file which is "declaration":true and then i run typecript compilare it will create two files in dist folder 1 index.js and 2 is index.d.ts and again pubilsh this you will get types when install that package

// if you are not adding prefix @urvish/command then you have to give unique name 

// and if you do not like this way to plublish and install, then use monorepos and it will handle everting 

// mono and turbo repo or lerna (it help your react and ts code into js code)
// there are three ways to create mono repos (see pic 7)
// create mono repo using this command
// npx create-turbo@latest and give name and give package manager name


// mono repos give you use comman folder in frontend and backend
// terbo repos give you system or layer on top of mono repos, that before frontend and backend my command code should complied to js from ts and schedule your builds

