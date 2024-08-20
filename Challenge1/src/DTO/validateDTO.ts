import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function validateDto(dtoClass: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Transform the request body to an instance of the DTO class
    const dto = plainToInstance(dtoClass, req.body);

    // Validate the DTO instance
    const errors = await validate(dto, {
      whitelist: true, // Automatically strip non-whitelisted properties
      forbidNonWhitelisted: true, // Throw an error if there are extra properties
    });

    // If validation fails, return an error response
    if (errors.length > 0) {
      const errorMessages = errors
        .map((error: ValidationError) => Object.values(error.constraints ?? {}))
        .flat();

      // Generate a list of valid inputs
      return res.status(400).json({
        errors: errorMessages.join(", "),
      });
    }

    // If valid, replace the request body with the DTO instance
    req.body = dto;
    next();
  };
}
