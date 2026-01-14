import dbConnect from "./configs/db.config.js";
import app from "./app.js";
import config from "./configs/env.config.js";

const startServer = async () => {
  try {
    await dbConnect();
    app.listen(config.port, () => {
      console.log(`Server is running at http://localhost:${config.port}/`);
    });
  } catch (error) {
    console.error("Failed to start server", error.message);
    process.exit(1);
  }
};

startServer();
