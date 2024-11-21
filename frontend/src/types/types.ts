import { type } from "os";

export type colorType =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";
export type buttonType = "button" | "submit" | "reset" | undefined;

export type userInfoType = {
  fullName?: string | null;
  email: string | null;
  password: string | null;
  confirmPassword?: string | null;
};

export type variantType =
  | "bordered"
  | "solid"
  | "faded"
  | "shadow"
  | "ghost"
  | "flat"
  | undefined;
export type raduisType = "none" | "sm" | "md" | "lg" | "full" | undefined;
export type initialStateType = {
  userCreated: {message:string, isSubscribed:boolean } | null;
  error: {message:string , error:string, statusCode:number} | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

export type filesType = {
  fileId: string;
  name: string;
  url: string;
  format: string;
  size: number;
  createdAt: Date;
  topic: string;
  documentType: string;
};
 
export type FilesState = {
  isFilesUploaded: boolean,
  confirmFileDelete: boolean,
  isManyFileDeleted: boolean,
  deleteFileId: string,
  isFileDeleted: boolean,
  uploadFilesStatus: boolean,
  isFilesLoaded: boolean,
  files: filesType[];
  isLoading: boolean;
  fileDeletLoading: boolean;
  error: {message:string , error:string, statusCode:number} | null;
};

export type FolderType = {
  folderId: string;
  name: string;
  files: filesType[];
  numberOfFiles: number;
};

export type RouteNameType = "allFiles" | "recentFiles" | "removedFiles" | "folder";


export interface userCookieInfoType {
  fullName?: string | null;
  email: string | null;
  plan: string | null;
}