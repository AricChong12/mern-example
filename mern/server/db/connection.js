import {MongoClient, ServerApiVersion} from "mongodb";


import dotenv from "dotenv";
dotenv.config();

const uri = process.env.ATLAS_URI || "";

const client = new MongoClient(uri,{
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

try {
    //connect client to server

    await client.connect()

    //send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
} catch (e) {
    console.error(e);
}

let db = client.db("employees");

export default db;