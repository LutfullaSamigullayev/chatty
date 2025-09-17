import { SVGProps } from "react";
//  -----------  Icon Types  -----------
export type IconProps = SVGProps<SVGSVGElement>;

//  -------------------  Form Types  -------------------
export interface authSubmit {
  title: string;
}
export interface inputPropsType {
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}

//  -------------------  Chat Types  -------------------
type userImgSize = 49 | 40 | 36;
export interface userImg {
  src: string;
  alt: string;
  size: userImgSize;
  isActive?: boolean;
  activeDotTop?: boolean;
}
export interface ChatProfileType extends userImg {
  username: string;
  lastTime?: string;
  backToContact: () => void;
}
export interface userContactType {
  userImgUrl: string;
  userName: string;
  massage: string | undefined;
  size: userImgSize;
  massageCount?: number;
  time?: string;
  isActive?: boolean;
  gap?: boolean;
  activeDotTop?: boolean;
}
export interface userMessageType {
  message: string;
  time?: string;
  receiver?: boolean;
  read?: boolean;
}

//  -------------------  Slice Types  -------------------
export interface UserStateType {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  bio: string;
}
