import mongoose from "mongoose";
import "dotenv/config";
// x8GxyDDhz6QOyn0e
// const uri = process.env.DATABASE_LOCAL;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  autoIndex: true,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
};

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.scp6egc.mongodb.net/book-collection?retryWrites=true&w=majority`;

const connectWithDB = () => {
  mongoose.connect(uri, options, (err, db) => {
    if (err) console.error(err);
    else console.log("database connection succesfull");
  });
};

export default connectWithDB;
