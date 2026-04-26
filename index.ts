import express from "express";
import cors from "cors"
import { prisma } from './lib/prisma'

const app = express();

app.use(cors())
app.use(express.json())

app.get("/", async (req, res) => {
    res.json({ message: "Hi" })
})

//get all the tasks
app.get("/todo/list", async (req, res) => {
    const todos = await prisma.todo.findMany()
    console.log(todos)
    res.json(todos)
})


//get a task
app.get("/todo/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await prisma.todo.findUnique({
            where: { id: Number(id) }
        })

        res.json(todo)

    } catch (error) {
        console.error(error)
    }
})

//update todo
app.put("/todo/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body

        const updatedTodo = await prisma.todo.update({
            where: { id: Number(id) },
            data: { description }
        })

        res.json(updatedTodo)
    } catch (error) {
        console.error(error)
    }
})


//delete a todo
app.delete("/todo/:id", async (req, res) => {
    const {id} = req.params;

    await prisma.todo.delete({
        where:{id: Number(id)}
    })

    console.log("deleted")
    res.json({message: "Deleted"})
})

//post a task
app.post('/todo', async (req, res) => {
    try {
        const { description } = req.body;

        const todo = await prisma.todo.create({
            data: { description },
        });

        res.json(todo);
    } catch (err) {
        console.error(err);
    }
})


//

app.listen(5000, () => {
    console.log("Server running on port 5000");
});