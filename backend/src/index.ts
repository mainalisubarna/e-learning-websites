import express, { Request, Response } from 'express';
import { dbConnection } from './config/db.config';

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send("hello");
})
dbConnection()
app.listen(3000,()=>{
    console.log("App is running on port 3000")
})