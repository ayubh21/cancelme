import { sql } from "drizzle-orm";
import db from "./db/setup.js";
import { logger } from "./shared/logger.js";
import express from "express";
import cors from "cors";
import { router } from "./routes/index.js";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import { createClient } from "redis";
import { API_BASE } from "./shared/constants/transaction.js";
import { checkUser } from "./middleware/auth.js";

const app = express();

logger.info("Starting in development mode", {
  label: "Server",
});

await db.execute(sql`select 1`);
logger.info(`Database connection established localhost:5432`, {
  label: "Server",
});

// start redis instance
export const redisClient = await createClient({
  url: process.env.REDIS_CLIENT_URL!,
})
  .on("error", (err) =>
    logger.error("Redis Client Error", { label: "REDIS", error: err }),
  )
  .connect();

if (!redisClient.isReady) {
  logger.error("Failed to connect to redis instance", {
    label: "REDIS",
  });
}
logger.info(" Redis connection successfully established", {
  label: "REDIS",
});

app.get("/", (_req, res) =>
  res.status(200).json({ status: "up", message: "API is live" }),
);
app.use(
  cors({
    origin: `${"http://localhost:8081"}`,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"],
    allowedHeaders: [
      "Content-Type, Authorization, Content-Length, X-Requested-With, Access-Control-Allow-Origin, Access-Control-Allow-Credentials",
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use(checkUser);
app.use(router);
app.all("/api/auth/{*any}", toNodeHandler(auth));

const PORT = Number(process.env.PORT) || 3001;
const HOST = process.env.HOST;

try {
  if (HOST) {
    app.listen(PORT, HOST, () => {
      logger.info(`cancelme backend listening on port ${PORT}`, {
        label: "Server",
      });
    });
  } else {
    app.listen(PORT, () => {
      logger.info(`cancelme backend listening on port ${PORT}`, {
        label: "Server",
      });
    });
  }
} catch {
  process.exit(1);
}
