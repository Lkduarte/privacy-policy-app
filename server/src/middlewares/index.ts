import express from "express";
import { merge, get } from "lodash";

import { getUserBySessionToken } from "../services/userServices";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<any> => {
  try {
    const sessionToken = req.cookies["USER-AUTH"];

    if (!sessionToken) {
      res.status(403).json({
        message: "User unauthenticated",
      });
      return;
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      res.status(403).json({
        message: "User not found for this session token",
      });
      return;
    }

    merge(req, { identity: existingUser });

    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message:
        "An error occurred when trying to check if user is authenticated",
      error,
    });
    return;
  }
};

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity._id") as unknown as string;

    if (!currentUserId) {
      res.status(401).json({
        message: "User unauthorized",
      });
      return;
    }

    if (currentUserId.toString() === id) {
      res.status(403).json({
        message: "User can't delete himself",
      });
      return;
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "An error occurred when tried to check if user is owner",
      error,
    });
    return;
  }
};
