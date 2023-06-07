import express from "express";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import expressSession from "express-session";
import cors from "cors";
import prisma from "./constants/config.js";
import accountRoutes from "./routes/accountRoutes.js";
import studentRoutes from "./routes/studentRouters.js";



const app = express();
const PORT = 3000;

//SETUP CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE", "PATCH"],
    credentials: true,
  })
);

//SETUP SESSION
app.use(
  expressSession({
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "lax" : "strict",
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    },
    secret: "a santa at nasa",
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", accountRoutes);
app.use("/api", studentRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server is running on port ${PORT}`);
});