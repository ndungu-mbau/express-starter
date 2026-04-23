import { Router } from "express";
import { validateRequest } from "zod-express-middleware";

import { userController } from "../../controllers";
import { findUserByEmailSchema, createUserSchema } from "../../validators/user-validators";

const usersRouter = Router();

usersRouter.get("/", validateRequest({ query: findUserByEmailSchema }), async (req, res) => {

  const { email } = req.query

  if (email) {
    const user = await userController.findUserByEmail(email);

    if(!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json({ data: user });
    return;
  }
  const data = await userController.findAll();
  res.json({ data });
});

usersRouter.get("/:id", async (req, res) => {
  const id: string = req.params.id as string;
    const data = await userController.findById(id);
    res.json({ data });
});

usersRouter.post("/", validateRequest({ body: createUserSchema }), async (req, res) => {
  const newUser = req.body
  const data = await userController.create(newUser);
  res.json({ data });
});

export { usersRouter };
