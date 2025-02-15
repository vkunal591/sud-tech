import mongoose from "mongoose";

export const dbConnect = async () => {
   await mongoose.connect('mongodb+srv://vkunal591:vkunal591@cluster0.huymi.mongodb.net/sud?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log("DB connected"))
    .catch(err => console.error("DB connection error", err));


}