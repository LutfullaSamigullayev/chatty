import { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;

export interface authSubmit {
  title: string;
}
type userImgSize = 49 | 40 | 36;
export interface userImg {
  src: string;
  alt: string;
  size: userImgSize;
  activeDotTop?: boolean;
  isActive?: boolean;
}
export interface userContactType {
  userImgUrl: string;
  userName: string;
  massage: string;
  size: userImgSize;
  massageCount?: number;
  time?: string;
  isActive?: boolean;
  gap?: boolean;
  activeDotTop?: boolean;
}
export interface userMassageType {
  massage: string;
  time?: string;
  receiver?: boolean;
  read?:boolean
}
