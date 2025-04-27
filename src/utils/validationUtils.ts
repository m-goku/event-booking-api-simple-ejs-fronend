import Joi from "joi";

import { userRegistrationType, userSignInType } from "../types/types";

export const validateRegistrationInput = (body: userRegistrationType) => {
  const validationSchema = Joi.object<userRegistrationType>({
    name: Joi.string().min(5).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(25),
    role: Joi.string().required(),
  });

  return validationSchema.validate(body);
};

export const validateLoginInput = (body: userSignInType) => {
  const validationSchema = Joi.object<userSignInType>({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(25),
    // .pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$"))
  });

  return validationSchema.validate(body);
};

// export const validateChangePassword = (body: ChangePasswordTypes) => {
//   const validationSchema = Joi.object<ChangePasswordTypes>({
//     oldPassword: Joi.string().required().min(6).max(255),
//     newPassword: Joi.string().required().min(6).max(255),
//     // .pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$"))
//   });

//   return validationSchema.validate(body);
// };
