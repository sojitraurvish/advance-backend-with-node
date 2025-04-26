import { createClient, RedisClientType } from "redis";

export class PubSubManager {
  private static instance: PubSubManager;
  private constructor() { //mad constructor private so no one will be able to create class instance out side of class

  }
  public static getInstance() { // does not matter how many times it get called only once instance is created 
    if (!PubSubManager.instance) {
      PubSubManager.instance = new PubSubManager();
    }
    return PubSubManager.instance;
  }
  addUserToStock(userId: string,stockTicker:string){//stockid or StockTicker  

  }
  removeUserFromStock(userId: string,stockTicker:string){
  }
  forwardMessageToStock(userId: string,stockTicker:string,price:string){
    // this.addUserToStock(userId,stockTicker);
    // this.removeUserFromStock(userId,stockTicker);
    // this.forwardMessageToStock(userId,stockTicker);
  }

}

// what this class singleton patten need to do it needs to keep track of who all users are subscribe to apple stock, who all users are subscribe to google stock, who all users are leaving right now all of this fucntion it need to expose, if i am on this page(see pic 43) then i say i am subscribe to these all stock if change the page then firsst unsubscribe all on first page and then i say i subscribe to these all stocks in page 2 so we have two functions addUserToStock, removeUserFromStock (this thing also can single stock you can subscbe simge stock and unsubscrbe it one page 1 also ), this class need to make sure, may be one more function is forwardMessageToStock which need to be called whenever stock update comes from a newyouk stock exchange, it is new price for this stockTicker you need to forword it to this user

// how to implement it 
// https://projects.100xdevs.com/tracks/singleton-sm-pubsubs/Singleton-Pattern--Backend-State-management-and-Pub-Subs-6
// see actual code bello for


// Import the necessary module from the 'redis' package
import { createClient, RedisClientType } from 'redis';

export class PubSubManager {
    private static instance: PubSubManager;
    private redisClient: RedisClientType;
    private subscriptions: Map<string, string[]>;

    // Private constructor to prevent direct construction calls with the `new` operator
    private constructor() {
        // Create a Redis client and connect to the Redis server
        this.redisClient = createClient();
        this.redisClient.connect();
        this.subscriptions = new Map();
    }

    // The static method that controls the access to the singleton instance
    public static getInstance(): PubSubManager {
        if (!PubSubManager.instance) {
            PubSubManager.instance = new PubSubManager();
        }
        return PubSubManager.instance;
    }

    public userSubscribe(userId: string, stock: string) {
        if (!this.subscriptions.has(stock)) {
            this.subscriptions.set(stock, []);
        }
        this.subscriptions.get(stock)?.push(userId);
        
        if (this.subscriptions.get(stock)?.length === 1) {
            this.redisClient.subscribe(stock, (message) => {
                this.handleMessage(stock, message);
            });
            console.log(`Subscribed to Redis channel: ${stock}`);
        }
    }


    public userUnSubscribe(userId: string, stock: string) {
        this.subscriptions.set(stock, this.subscriptions.get(stock)?.filter((sub) => sub !== userId) || []);

        if (this.subscriptions.get(stock)?.length === 0) {
            this.redisClient.unsubscribe(stock);
            console.log(`UnSubscribed to Redis channel: ${stock}`);
        }
    }

    // Define the method that will be called when a message is published to the subscribed channel
    private handleMessage(stock: string, message: string) {
        console.log(`Message received on channel ${stock}: ${message}`);
        this.subscriptions.get(stock)?.forEach((sub) => {
            console.log(`Sending message to user: ${sub}`);
        });
    }

    // Cleanup on instance destruction
    public async disconnect() {
        await this.redisClient.quit();
    }
}

// Create a simple index.ts file to simulate users

import { PubSubManager } from "./PubSubManager";

setInterval(() => {
    PubSubManager.getInstance().userSubscribe(Math.random().toString(), "APPL");
}, 5000)


