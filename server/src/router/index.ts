import { Router } from "express";

import authentication from "./authentication";
import users from "./users";
import terms from "./terms";

const router = Router();

export default (): Router => {
  authentication(router);
  users(router);
  terms(router);

  return router;
};
