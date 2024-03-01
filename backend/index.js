import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

// SETUP
const app = express();
const prisma = new PrismaClient();
app.use(express.json())
app.use(cors())


// API
app.get("/api/images", async (req, res) => {

    const images = await prisma.image.findMany();
    res.json(images);

})

app.post("/api/images", async (req, res) => {

    const { name, width, height, pixels } = req.body;

    if ( !name || !width || !height || !pixels ) {
        return res.status(400).send("at least one parameter is missing");
    }

    try {
        const image = await prisma.image.create({
            data: { name, width, height, pixels }
        });
        res.json(image);
    }
    catch(error) {
        return res.status(500).send("whoops, something went wrong");
    }
       
})

app.put("/api/images/:id", async (req, res) => {

    const { name, width, height, pixels } = req.body;
    const id = parseInt(req.params.id);

    if ( !name || !width || !height || !pixels ) {
        return res.status(400).send("at least one parameter is missing");
    }
    if ( !id || isNaN(id) ) {
        return res.status(400).send("id is not a valid number");
    }

    try {
        const updatedImage = await prisma.image.update({
            where: { id },
            data: { name, width, height, pixels }
        });
        res.json(updatedImage);
    }
    catch(error) {
        return res.status(500).send("whoops, something went wrong");
    }

})

app.delete("/api/images/:id", async (req, res) => {

    const id = parseInt(req.params.id);

    if ( !id || isNaN(id) ) {
        return res.status(400).send("id is not a valid number");
    }

    try {
        await prisma.image.delete({
            where: { id }
        });
        res.status(204).send();
    }
    catch(error) {
        return res.status(500).send("whoops, something went wrong");
    }

})


// RUN
app.listen(5000, () => {
    console.log("server running on localhost:5000");
})