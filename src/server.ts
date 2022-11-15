import express from "express";

// import { createCourse } from "./routes";

const app = express();

app.use(express.json());

// app.get("/", createCourse);

app.get("/", (request, response) => {
    return response.json({ message: "Hello World" });
});

app.post("/courses", (request, response) => {
    const { name } = request.body;
    return response.json({ name });
})

app.listen(3333);
