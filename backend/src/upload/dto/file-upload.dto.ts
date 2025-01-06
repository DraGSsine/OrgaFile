import { IsIn, IsString } from "class-validator";
import { FileMetaData } from "../../types/type";

export class fileUploadDto {
  @IsString()
  @IsIn(["general", "custom"])
  categorizationMode: string;
  @IsString({ each: true })
  customTags: string[];
  @IsString({ each: true })
  files: FileMetaData[];
}