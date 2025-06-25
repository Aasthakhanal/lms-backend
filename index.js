import express from "express";
import { connectToDB } from "./config/db.js";
import bookRouter from "./routes/bookRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import dotenv from "dotenv";


const app = express();
dotenv.config();
const port = 5003;

connectToDB(); 

app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Hello World!",
  });
});

// app.get("/api/books", (req, res) => {
//   res.json({
//     success: true,
//     message: "This is book route",
//   });
// });

app.post("/api/books/create", (req, res) => {
  res.json({
    success: true,
    message: "This is book creation route",
  });
});

app.use("/api/books", bookRouter);
app.use("/api/auth", userRoutes)
app.use("/api/transactions", transactionRoutes);

app.listen(port, () => {
  console.log(`Server runnning on port ${port}`);
});
