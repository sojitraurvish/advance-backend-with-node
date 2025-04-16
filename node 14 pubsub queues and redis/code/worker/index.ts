import { createClient } from "redis";

const client = createClient();

async function main() {
  await client.connect();
  while (1) {
    const response = await client.brPop("submissons", 0); //instead of running this while loop infinite with rpop(it always sends null time to time and your loop will keep running) use brpop and await it so you get blocked here untill you do not get something then process submition
    // here you can run users code in decker container with docker exec
    console.log(response);
    await new Promise((resolve) => setTimeout(resolve, 1000));// this is where do that expensive opration
    // send it to pubsub
    console.log("Processed users submissions");
  }
}

main();
