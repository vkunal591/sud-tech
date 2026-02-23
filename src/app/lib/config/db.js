// import mongoose from 'mongoose';

// const db = async () => {
//   if (mongoose.connections[0].readyState) {
//     console.log("Already connected to DB");
//     return;
//   }

//   const dburl = process.env.DB_URL;
//   if (!dburl) {
//     throw new Error('DB_URL environment variable is missing');
//   }

//   try {
//     await mongoose.connect('mongodb+srv://vkunal591:vkunal591@cluster0.lrlgh34.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
//     console.log("DB connected");
//   } catch (err) {
//     console.error("DB connection error", err);
//     throw new Error("Failed to connect to DB");
//   }
// };

// export async function dbConnect(req, res) {
//   try {
//     await db();
//     console.log({ message: "DB Connected" });
//   } catch (err) {
//     console.log(err);
//   }
// }





import mongoose from 'mongoose';

const db = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected to DB");
    return;
  }

  try {
    await mongoose.connect('mongodb+srv://vkunal591:vkunal591@cluster0.lrlgh34.mongodb.net/sudTech?appName=Cluster0');
    // await mongoose.connect('mongodb+srv://vkunal591:vkunal591@cluster0.huymi.mongodb.net/sudTech?retryWrites=true&w=majority&appName=Cluster0');
    // await mongoose.connect('mongodb://localhost:27017/sud');
    console.log("DB connected");
  } catch (err) {
    console.error("DB connection error", err);
    throw new Error("Failed to connect to DB");
  }
};

export async function dbConnect(req, res) {
  try {
    await db();
    // res.status(200).json({ message: "Connected to DB" });
    console.log({message:"DB Connected"})
  } catch (err) {
    // res.status(500).json({ error: "DB connection failed" });
    console.log(err)
  }
}
