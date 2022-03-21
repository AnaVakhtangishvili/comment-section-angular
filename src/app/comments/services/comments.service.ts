import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CommentInterface } from "../types/interfaces";

@Injectable()
export class CommentsService {
  constructor(private httpClient: HttpClient){}

  getComments(): Observable<CommentInterface[]> {
    return this.httpClient.get<CommentInterface[]>('http://localhost:3000/comments');
  }

  createNewComment(commentText: string, parentId: number | null): Observable<CommentInterface> {
    return this.httpClient.post<CommentInterface>('http://localhost:3000/comments',{
      content: commentText,
      parentId: parentId,
      createdAt: new Date().toISOString(),
      score: 0,
      user: {
        image: {
          png: "/assets/images/image-juliusomo.png",
          webp: "/assets/images/image-juliusomo.webp",
        },
        username: 'juliusomo'
      }
    })
  }

  updateComment(commentText: string, commentId: number, createdAt: string): Observable<CommentInterface>{
    return this.httpClient.patch<CommentInterface>(
      `http://localhost:3000/comments/${commentId}`,
      {
        content: commentText,
        createdAt: new Date().toISOString()
      }
    );
  }

  deleteComment(commentId: number): Observable<{}> {
    return this.httpClient.delete(`http://localhost:3000/comments/${commentId}`);
  }

}
