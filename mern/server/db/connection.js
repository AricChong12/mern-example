import {MongoClient, ServerApiVersion} from "mongodb";
//import libs

//import dotenv to use .env
import dotenv from "dotenv";
dotenv.config();

//set url of mongodb to the reference in the .env
const uri = process.env.ATLAS_URI || "";

//Create a MongoDB client, and make sure it follows strict, stable rules so my app doesn’t break later.
const client = new MongoClient(uri,{
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

//db ops are async
try {
    //connect client to server

    await client.connect()

    //send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });

    //console log successful msg
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
} catch (e) {
    console.error(e);
    //console log error if any
}

// let the db named employees = to db constant
let db = client.db("employees");

//export the db 
export default db;