import mongoose from 'mongoose';

const db = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected to DB");
    return;
  }

  const dburl = process.env.DB_URL;
  if (!dburl) {
    throw new Error('DB_URL environment variable is missing');
  }

  try {
    await mongoose.connect('mongodb+srv://vkunal591:vkunal591@cluster0.lrlgh34.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log("DB connected");
  } catch (err) {
    console.error("DB connection error", err);
    throw new Error("Failed to connect to DB");
  }
};

export async function dbConnect(req, res) {
  try {
    await db();
    console.log({ message: "DB Connected" });
  } catch (err) {
    console.log(err);
  }
}
