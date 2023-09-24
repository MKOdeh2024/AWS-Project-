import  express from "express";
import {myDataSource } from "./db/dataSource";
import userRoute from "./routes/Users";
import bookRoute from "./routes/Books";
import "mysql";

const app = express();

app.use(express.json());

const port = 3000;

app.use("/user",userRoute);
app.use("/book",bookRoute);

app.listen(port,()=>{
    console.log(`app running at port: ${port}`);
})