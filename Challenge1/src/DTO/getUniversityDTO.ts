import { IsOptional, IsString, IsBoolean, IsIn } from "class-validator";
import { Transform } from "class-transformer";

export class FilterUniversitiesDto {
  @IsOptional()
  @IsString({ message: "Name must be a string" })
  name?: string;

  @IsOptional()
  @IsString({ message: "Country must be a string" })
  country?: string;

  @IsOptional()
  @Transform(({ value }) => value === "true") // Transform query string to boolean
  @IsBoolean({ message: "isBookmark must be a boolean value" })
  isBookmark?: boolean;

  @IsOptional()
  @Transform(({ value }) => value === "true") // Transform query string to boolean
  @IsBoolean({ message: "showAll must be a boolean value" })
  showAll?: boolean;
}
