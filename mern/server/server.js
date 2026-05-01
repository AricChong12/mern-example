//import libs
import express from "express";
import cors from "cors";

//import routes from its folder
//Because you exported the router as the default, and with default exports you can name it anything you want when importing.
import records from "./routes/record.js";

//import dotenv to use .env
import dotenv from "dotenv";
dotenv.config();

//set port number to reference the port number in th .env if cant be found use 5050
const PORT = process.env.PORT || 5050;

//build express app
const app = express();

//enables cors, allows frontend to talk to backend
app.use(cors());
//parses incoming reequest bodies with json data
app.use(express.json());
//Mounts a router (records) on the /record path.
app.use("/record", records);

//start the express server and lsiten to the port
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
