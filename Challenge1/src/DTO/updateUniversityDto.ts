// UpdateUniversityDto.ts
import { Expose } from "class-transformer";
import { IsString, IsArray, IsOptional, IsBoolean } from "class-validator";

export class UpdateUniversityDto {
  @IsOptional()
  @IsString({ message: "Name must be a string" })
  @Expose()
  name?: string;

  @IsOptional()
  @IsString({ message: "Country must be a string" })
  @Expose()
  country?: string;

  @IsOptional()
  @IsArray({ message: "Webpages must be an array of strings" })
  @IsString({ each: true, message: "Each webpage must be a string" })
  @Expose()
  webpages?: string[];

  @IsOptional()
  @IsBoolean({ message: "isBookmark must be a boolean" })
  @Expose()
  isBookmark?: boolean;

  @IsOptional()
  @IsBoolean({ message: "isActive must be a boolean" })
  @Expose()
  isActive?: boolean;
}
