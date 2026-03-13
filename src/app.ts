import express from "express";
import taskRoutes from "./interfaces/routes"

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.use(taskRoutes)
export default app;