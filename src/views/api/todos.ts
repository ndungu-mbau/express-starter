import { Router } from "express";
import { processRequestBody } from "zod-express-middleware"

import { createTodoSchema } from "../../validators";
import { todosController } from "../../controllers";

const todosRouter = Router();

todosRouter.get("/", async (req, res) => {
  const todosForUser = await todosController.find({},req.user?.id!);
  res.json({ todos: todosForUser });
});

todosRouter.post("/", processRequestBody(createTodoSchema), async (req, res) => {
  const newTodo = await todosController.create(req.body, req.user?.id!);
  res.json({ todo: newTodo });
});

export { todosRouter };
