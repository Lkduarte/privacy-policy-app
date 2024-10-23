import express, { Request, Response } from "express";
import {
  createTerm,
  deleteTermById,
  getCurrentTerm,
  getTermById,
  getTerms,
} from "../services/termServices";

export const getAllTerms = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const terms = await getTerms();

    return res.status(200).json(terms);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "An error occurred when tried to get all terms",
    });
  }
};

export const getById = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    const term = await getTermById(id);
    console.log(term);
    if (!term) {
      return res.status(404).json({
        message: "Term not found",
      });
    }

    return res.status(200).json(term);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: `An error occurred when tried to get term by id - Term not found for ID: ${id}`,
    });
  }
};

export const getCurrent = async (req: Request, res: Response): Promise<any> => {
  try {
    const term = await getCurrentTerm();
    if (!term) {
      return res.status(404).json({ message: "Term does not exist" });
    }
    term.usersSigned = [];

    const termo = term;

    return res.status(200).json(termo);
  } catch (error) {
    return res.json(400).json({
      message: "An error occurred when tried to get current term",
      error: error,
    });
  }
};

export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const { description, options } = req.body;

    if (!description || !options || options.length === 0) {
      return res.status(400).json({
        message: "Description and at least one option are required.",
      });
    }

    const term = await createTerm({
      description,
      options,
      isActual: true,
      date: new Date(),
      usersSigned: [],
    });

    return res.status(200).json(term);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while trying to create the term.",
    });
  }
};

export const deleteTerm = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    const deletedTerm = await deleteTermById(id);

    return res.json(deletedTerm);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "An error occurred when tried to delete Term",
      error: error,
    });
  }
};
