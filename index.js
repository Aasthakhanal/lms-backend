import express from "express";
import { connectToDB } from "./config/db.js";
import bookRouter from "./routes/bookRoutes.js";
import authRoutes from "./routes/userRoutes.js"


const app = express();
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
app.use("/api/auth", authRoutes)
// app.use("api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server runnning on port ${port}`);
});
