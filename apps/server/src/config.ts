import path from "path";
import dotenv from "dotenv";

dotenv.config();

export const PORT = Number(process.env.PORT) || 3030;

export const NODE_ENV = process.env.NODE_ENV || "production";

export const FRONTEND_DIR = path.join(__dirname, "..", "public");
