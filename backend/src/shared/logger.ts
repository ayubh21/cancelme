import winston from "winston";
import "winston-daily-rotate-file";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OLD_LOG_FILE = path.join(__dirname, "../config/logs/cancelme.log");
try {
  const file = fs.lstatSync(OLD_LOG_FILE);
  if (!file.isSymbolicLink()) {
    fs.unlinkSync(OLD_LOG_FILE);
  }
} catch {
  void 0;
}

const hformat = winston.format.printf(
  ({ level, label, message, timestamp, ...metadata }) => {
    let msg = `${timestamp} [${level}]${
      label ? `[${label}]` : ""
    }: ${message} `;
    if (Object.keys(metadata).length > 0) {
      msg += JSON.stringify(metadata);
    }
    return msg;
  },
);

const logLevel =
  process.env.LOG_LEVEL || (process.env.VITEST ? "silent" : "debug");

export const logger = winston.createLogger({
  level: logLevel === "silent" ? "error" : logLevel,
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.timestamp(),
    hformat,
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.splat(),
        winston.format.timestamp(),
        hformat,
      ),
    }),
    new winston.transports.DailyRotateFile({
      filename: path.join(__dirname, "../config/logs/cancelme-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "1d",
      createSymlink: true,
      symlinkName: "cancelme.log",
      format: winston.format.combine(
        winston.format.splat(),
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
  ],
});

if (logLevel === "silent") {
  logger.silent = true;
}