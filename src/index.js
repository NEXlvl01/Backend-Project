import app from "./app.js";
import dbConnect from "./db/dbConnect.js";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 8000;

dbConnect()
.then(() => {
    app.listen(port, () => {
        console.log(`App started successfully on port ${port}`);
    })
})
.catch((err) => {
    console.log(err);
    throw err;
})
