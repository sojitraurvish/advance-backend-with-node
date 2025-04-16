import express from "express";
import { createClient } from "redis";

const app = express();

app.use(express.json());

const client = createClient();  

client.on("error",(err)=>console.log("radis client Error",err))

app.post("/submit", async (req, res) => {
    const { problemId, userId, code, language } = req.body;
    // const { problemId, userId, code, language } = req.body; // push this info in database also
    try {
        const resp = await client.lPush(
            "submissions",// name of queue
            JSON.stringify({ problemId, userId, code, language })
        );
        console.log(resp);
        res.json({
            status: 200,
            message: "Submission request successfully",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

async function startServer() {
    try { 
        await client.connect();
        console.log("connect to Redis");
        
        app.listen(3000,()=>{
            console.log("server is ruunign on port 3000");
            
        });
        
    } catch (error) {
        console.log("falild to connect to redis",error);
        
    }
}
