import mongoose from "mongoose";

export const mongoConnect = () => {
  const DB = process.env.MONGO_URL;
  mongoose
    .connect(DB)
    .then(console.log("DB Connected"))
    .catch((err) => {
      console.log(err);
    });
};
