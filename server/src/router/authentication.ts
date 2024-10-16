import { Router } from "express";

import { login } from "../controllers/authentication";

export default (router: Router) => {
  router.post("/auth/login", login);
};
