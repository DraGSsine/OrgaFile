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
  signInFor?: "Projects" | "Designs" | null;
  email: string | null;
  password: string | null;
  confirmPassword?: string | null;
  field?: string | null;
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
  userCreated: {message:string} | null;
  error: {message:string , error:string, statusCode:number} | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

export type filesType = {
  name: string;
  createdAt: string;
  size: number;
  format: string;
  url: string;
  id: string;
  topic: string;
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
  id: string;
  name: string;
  topics: string[];
  files: filesType[];
};

export type RouteNameType = "allFiles" | "recentFiles" | "removedFiles" | "folder";