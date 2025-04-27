import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/tokenUtils";
import { Schema } from "mongoose";
import {
  Forbidden403,
  InternalServerError500,
  NotFound404,
} from "../utils/responses";
import { logger } from "../utils/loggerUtils";

export interface AuthenticationRequest extends Request {
  user: {
    name: string;
    _id: Schema.Types.ObjectId;
    role: string;
  };
}

export const AuthenticateUser = (
  req: AuthenticationRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    /*
        - get token from header
        - verify token with JWT verify
        - get Payload
        - add to req.user
  */

    const token = req.headers["token"];
    if (!token) {
      return NotFound404(res, "No User token Provided");
    }

    const payload: any = verifyToken(token);
    if (!payload) {
      return NotFound404(res, "Failed to Verify Token");
    }

    req.user = {
      name: payload.name,
      _id: payload._id,
      role: payload.role,
    };
  } catch (error) {
    logger.error(error.message);
    return InternalServerError500(res, error);
  }
  next();
};

export const RoleAuthorization = (
  req: AuthenticationRequest,
  res: Response,
  next: NextFunction
) => {
  const role = req.user.role;
  if (role != "Organizer") {
    return Forbidden403(
      res,
      "You Are Not Authorized to Perform this Operation"
    );
  }
  next();
};
