import { Expose } from "class-transformer";
import { IsString, IsArray, IsOptional, IsBoolean } from "class-validator";

export class CreateUniversityDto {
  @Expose()
  @IsString({ message: "Name is required and must be a string" })
  name!: string;

  @Expose()
  @IsString({ message: "Country is required and must be a string" })
  country!: string;

  @IsArray({ message: "Webpages must be an array of strings" })
  @Expose()
  @IsString({ each: true, message: "Each webpage must be a string" })
  webpages!: string[];

  @IsOptional()
  @Expose()
  @IsBoolean({ message: "isBookmark must be a boolean" })
  isBookmark?: boolean;
}
