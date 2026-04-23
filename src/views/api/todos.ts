import { Router } from "express";
import { todoController } from "../../controllers";

const todosRouter = Router();

todosRouter.get("/", (req, res) => {
  res.json({ todos: todoController.findAll() });
});

todosRouter.get("/:userId", (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const todos = todoController.findTodosByUserId(userId);
  res.json({ todos });
});

export { todosRouter };
