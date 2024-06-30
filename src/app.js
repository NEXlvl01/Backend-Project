import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());

app.use(express.json()); //For Accepting Data from form
app.use(express.urlencoded()); //For Accepting Data from URL
app.use(express.static("public")); //For storing static data in public folder
app.use(cookieParser());

export default app;