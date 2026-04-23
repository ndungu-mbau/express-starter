import { Router } from "express";

const authRendererRouter = Router();

authRendererRouter.get("/login", (req, res) => {
  res.render("login", {
    title: "Login",
  });
});

authRendererRouter.get("/signup", (req, res) => {
  res.render("signup", {
    title: "Sign Up",
  });
});

export { authRendererRouter };