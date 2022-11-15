import express from "express";

// import { createCourse } from "./routes";

const app = express();

// app.get("/", createCourse);

app.get("/", (request, response) => {
    return response.json({ message: "Hello World" });
});

app.listen(3333);
