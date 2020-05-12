import express from "express";
import fotoControler from "./controler";

const fotoRouter = new express.Router();

fotoRouter.get("/", fotoControler.get);
fotoRouter.get("/:id", fotoControler.getById);
fotoRouter.post("/", fotoControler.post);
fotoRouter.delete("/:id", fotoControler.delete);
fotoRouter.patch("/:id", fotoControler.patch);

export default fotoRouter;