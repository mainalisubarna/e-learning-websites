import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send("hello");
})

app.listen(3000,()=>{
    console.log("App is running on port 3000")
})