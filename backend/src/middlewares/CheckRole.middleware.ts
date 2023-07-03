import { NextFunction, Request, Response } from "express";
export const authorize =
  (...accessToTheseRoles: any) =>
  (req: Request, res: Response, next: NextFunction) => {
    const userDetails: any = req.user;
    const { roles } = userDetails;
    if (accessToTheseRoles.includes(roles)) {
      next();
    } else {
      res.status(401).json({
        status: false,
        message: "You are not a authorized user to access this resources",
      });
    }
  };
