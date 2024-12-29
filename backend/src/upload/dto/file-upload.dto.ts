import { IsIn, IsString } from "class-validator";
import { FileMetaData } from "src/types/type";

export class fileUploadDto {
  @IsString()
  @IsIn(["general", "basic", "custom"])
  categorizationMode: string;
  @IsString({ each: true })
  customTags: string[];
  @IsString({ each: true })
  files: FileMetaData[];
}
