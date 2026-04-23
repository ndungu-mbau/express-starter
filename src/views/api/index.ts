import { Router } from "express";
import { usersRouter } from "./user";
import { todosRouter } from "./todos";

const apiRouter = Router();

apiRouter.get("/", (req, res) => {
  res.json({ message: "API Router up and healthy" });
});

apiRouter.use("/users", usersRouter);
apiRouter.use("/todos", todosRouter);

export { apiRouter };
