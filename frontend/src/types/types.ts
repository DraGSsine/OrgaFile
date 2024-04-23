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
  signInFor?:"Projects" | "Designs" | null;
  email:string | null;
  password:string | null;
  confirmPassword?:string | null;
  field?:string | null;
};

export type variantType = "bordered" | "solid" | "faded" | "shadow" | "ghost" | "flat" | undefined;
export type raduisType = "none" | "sm" | "md" | "lg" | "full" | undefined;
export type initialStateType = 
{
  userInfo:string | null;
  isAuthenticated:boolean;
  loading:boolean;
}