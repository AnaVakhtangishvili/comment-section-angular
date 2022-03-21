import { formStateEnum } from "./emuns";

export interface CommentInterface {
  id: number;
  content: string;
  createdAt:string;
  score: number;
  user: UserInterface;
  replies: CommentInterface[];
  replyingTo: string | null;
  parentId: number | null;
}

interface UserInterface {
  image: ImageInterface;
  username: string;
}

interface ImageInterface {
  png: string;
  webp: string;
}

export interface formStateInterface {
  id: number,
  state: formStateEnum
}