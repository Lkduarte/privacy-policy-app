import { Router } from "express";

import { isAuthenticated } from "../middlewares";
import {
  deleteTerm,
  getAllTerms,
  getById,
  getCurrent,
  register,
} from "../controllers/term";

export default (router: Router) => {
  router.get("/term/getAll", isAuthenticated, getAllTerms);
  router.get("/term/current", getCurrent);
  router.get("/term/get/:id", isAuthenticated, getById);
  router.post("/term/register", register);
  router.delete("/term/delete/:id", isAuthenticated, deleteTerm);
};
