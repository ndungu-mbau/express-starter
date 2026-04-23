import { Router } from "express";
import { usersRouter } from "./user";
import { todosRouter } from "./todos";
import { authRouter } from "./auth";
import { requireAuth } from "../../lib/middleware/auth";

const apiRouter = Router();

apiRouter.get("/", (req, res) => {
  res.json({ message: "API Router up and healthy" });
});

apiRouter.use("/auth", authRouter);
apiRouter.use("/users", requireAuth, usersRouter);
apiRouter.use("/todos", requireAuth, todosRouter);

export { apiRouter };
