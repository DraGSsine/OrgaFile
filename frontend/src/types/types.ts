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


export type initialStateType = 
{
  userInfo:string | null;
  isAuthenticated:boolean;
  loading:boolean;
}