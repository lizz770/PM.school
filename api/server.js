import express from "express";
import multer from 'multer';
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import expressSession from "express-session";

import prisma from "./constants/config.js";
import cors from "cors";
import accountRoutes from "./routes/accountRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import trustedUsersRoutes from "./routes/trustedUsersRoutes.js";
import tutorRoutes from "./routes/tutorRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();
const PORT = 3000;

//хранилище для изображений 
const storage = multer.diskStorage({
  //путь куда сохраняем картинки в папку uploads
  destination: (_, __, cb)=>{
    cb(null,'uploads');
  },
  //название файла
  filename: (_, file, cb)=>{
    cb(null, file.originalname);
  },
})
//объясняем экспрессу
const upload = multer({ storage });
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE", "PATCH"],
    credentials: true,
  })
);

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
app.use("/api", requestRoutes);
app.use("/api", trustedUsersRoutes);
app.use("/api", studentRoutes);
app.use("/api", tutorRoutes);

//есть ли в этой папке то что я передаю
app.use('/api/uploads',express.static('uploads'))

//запрос на загрузку ссылка на картинку
app.post('/api/upload', upload.single('image'),(req,res)=>{
  res.json({
    //из запроса вытаскиваем файл и его оригинальное название
    url:`uploads/${req.file.originalname}`
  });
})

app.listen(PORT, (error) => {
  if (error) {
    console.log("Ошибка запуска сервера");
  }
  console.log("Server started on port", PORT);
});
