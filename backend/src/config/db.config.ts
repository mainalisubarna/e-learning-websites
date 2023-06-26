import exp from 'constants';
import mongoose from 'mongoose';
import 'dotenv/config';

export const dbConnection = async() =>{
    const MONGO_URI : string = process.env.MONGO_URL || '';
    console.log(MONGO_URI)
    const connection : any = await mongoose.connect(MONGO_URI);
}