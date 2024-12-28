import mongoose from "mongoose";
const connection: { isConnection?: number } = {};
const connectDB = async () => {
  if (connection.isConnection) {
    return;
  }

  const db = await mongoose.connect("mongodb://localhost:27017/meeting-zoom");
  connection.isConnection = db.connections[0].readyState;
};

export default connectDB;
