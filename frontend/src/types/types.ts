import { HugeiconsProps } from "hugeicons-react";
import { FC, RefAttributes } from "react";
export interface ModeCardProps {
  option: CategorizationOption;
  isSelected: boolean;
  onClick: () => void;
  isCustomMode?: boolean;
  customTags?: string[];
  onAddTag?: (tag: string) => void;
  onRemoveTag?: (tag: string) => void;
}

export interface CustomTagInputProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

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
  acceptTerms: boolean;
};
export type CategorizationMode = "general" | "custom";

export interface CategorizationOption {
  id: CategorizationMode;
  title: string;
  description: string;
  icon: FC<Omit<HugeiconsProps, "ref"> & RefAttributes<SVGSVGElement>>;
}
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
  userCreated: { message: string; isSubscribed: boolean } | null;
  error: { message: string; error: string; statusCode: number } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  userInfoLoading: boolean;
  userInformation: {
    status: subscribeStatus;
    subscriptionEnds: string;
    price: string;
    fullName: string;
    currency: string;
    lastFourDigits: string;
    cardBrand: string;
    email: string;
    plan: any;
    subscriptionHistory: [];
  };
};

export interface FileFormat {
  name: string;
  numberOfFiles: number;
  size: number;
}

export interface CloudInfo {
  filesFormatInfo: FileFormat[];
  storage: number;
  storageUsed: number;
}

export interface ColorScheme {
  barColor: string;
  backGroundColor: string;
}

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
  isFilesUploaded: boolean;
  confirmFileDelete: boolean;
  isManyFileDeleted: boolean;
  deleteFileId: string;
  isFileDeleted: boolean;
  uploadFilesStatus: boolean;
  isFilesLoaded: boolean;
  files: filesType[];
  isLoading: boolean;
  fileDeletLoading: boolean;
  error: { message: string; error: string; statusCode: number } | null;
};

export type FolderType = {
  folderId: string;
  name: string;
  files: filesType[];
};

export type RouteNameType =
  | "allFiles"
  | "recentFiles"
  | "removedFiles"
  | "folder";

export type showUsageModalType = {
  open: boolean;
  modal: "storage" | "credits";
};

export interface userCookieInfoType {
  fullName?: string | null;
  email: string | null;
  plan: string | null;
}

type Color =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";
export interface StorageProgressProps {
  isLoading: boolean;
  value: number;
  max: number;
  label: string;
  color?: Color;
  className?: string;
}

export interface StorageProgressProps {
  isLoading: boolean;
  value: number;
  max: number;
  label: string;
  color?: Color;
  className?: string;
}

export interface UsageCardProps {
  title: string;
  value: number;
  max: number;
  label: string;
  progressColor: string;
  icon: React.ReactNode;
  iconColor: string;
  iconBgColor: string;
  isLoading: boolean;
}

export interface UserOverviewProps {
  isMobile?: boolean;
}

export interface RecentUploadsProps {
  files: any[];
  isLoading: boolean;
  maxRows?: number;
  routeName?: RouteNameType;
}

export type subscribeStatus = "active" | "inactive" | "canceled" | "ended";

export interface Transaction {
  plan: string;
  price: number;
  currency: string;
  paymentMethod: string;
  lastFourDigits: string;
  status: "paid" | "canceled" | "inactive";
  startDate: string;
  cardBrand: string;
}

export interface PaymentHistoryProps {
  transactions: Transaction[];
  className?: string;
}

export interface initialDashboardStateType {
  userLimits: {
    storageLimit: number;
    storageUsed: number;
    creditsLimit: number;
    creditsUsed: number;
    loading: boolean;
    error: any;
  };
  cloudInfo: {
    data: {
      filesFormatInfo: {
        name: string;
        size: number;
        numberOfFiles: number;
      }[];
      storageUsed: number;
      storage: number;
    };
    loading: boolean;
    error: any;
  };
  SignoutModal: {
    isOpen: boolean;
  };
}
