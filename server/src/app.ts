import express from "express"

const app = express();
const PORT = 4000;


console.log("first")

app.listen(PORT, () => {
    console.log(`server is running at localhost:${PORT}`)
})