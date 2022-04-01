export interface CommentInterface {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: UserInterface | undefined;
  replies: ReplyInterface[];
}

export interface UserInterface {
  image: ImageInterface;
  username: string;
}

export interface ImageInterface {
  png: string;
  webp: string;
}

export type ReplyInterface = Omit<CommentInterface, 'replies'> & {
  replyingTo: string | undefined;
};

export interface ActiveFormInterface {
  id: number | undefined;
  state: FormStateEnum;
}


export enum FormStateEnum {
  replying = 'replying',
  editing = 'editing',
}

export enum SubmitStateEnum {
  write = 'Write',
  update = 'Update',
  reply = 'Reply',
}

export enum ButtonActionEnum {
  delete = 'Delete',
  reply = 'Reply',
  edit = 'Edit',
}

export enum FormActionEnum {
  replying = 'replying',
  editing = 'editing',
}
