import { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;

export interface authSubmit {
  title: string
}
type userImgSize = 49 | 40 | 36;
export interface userImg {
  src: string;
  alt: string;
  size: userImgSize;
  isActive?: boolean;
}
export interface userContactType {
  userImgUrl: string;
  userName: string;
  massage: string;
  massageCount: number;
  time: string;
  isActive?: boolean;
}