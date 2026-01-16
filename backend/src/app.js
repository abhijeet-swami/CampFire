import express from "express";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error.middleware.js";

import authRouter from "./routes/auth.route.js";
import campRoutes from "./routes/camp.route.js";

const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/camp", campRoutes);

app.use(errorMiddleware);

export default app;
