import mongoose from "mongoose";

export const dbConnect = async () => {
   await mongoose.connect(process.env.DB_URI).then(()=>console.log("DB connected"))

}