import dotenv from "dotenv";
import app from "./app";
import connectDB from "./config/database";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("unhandledRejection", (error: Error) => {
  console.log(`unhandledRejection Errors ${error.name} || ${error.message}`);
  server.close(() => {
    console.log("Shutting down ... ");
    process.exit(-1);
  });
});
