import  type { Request, Response } from "express";

export const getUser = (req: Request, res: Response) => {
  console.log("It's Working!!!");

  res.status(200).json({ message: "OK" });
};

export default {
  getUser,
};
