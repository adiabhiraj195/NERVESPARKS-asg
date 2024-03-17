import dotenv from "dotenv";
dotenv.config();
import http from "http";
import app from "./app";
import { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const server = http.createServer(app);

const client = new MongoClient(MONGO_URI as string, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
// async function run() {
//     try {
//         // Connect the client to the server	(optional starting in v4.7)
//         await client.connect();
//         // Send a ping to confirm a successful connection
//         await client.db("admin").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
mongoose.connection.once("open", ()=>{
    console.log("mongoose is connected to db");
});
mongoose.connection.on("error", (err)=>{
    console.log(err);
});
async function startServer(mongo_url: string) {
    // await run().catch(console.dir);
    await mongoose.connect(mongo_url);


    server.listen(PORT, () => {
        console.log(`Server is Live at Port: ${PORT}`)
    });
}

startServer(MONGO_URI as string);