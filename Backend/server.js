const express = require("express");
const app = express();

const PORT = 8080;

app.get("/", (req, res) => {
    res.send("My name is Mayank Sharma. I am from squad-84")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
