import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentInterface, ReplyInterface, UserInterface } from '../models/comments.model';

@Injectable()
export class CommentsService {
  baseUrl: string = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  getCurrentUser(): Observable<UserInterface> {
    return this.httpClient.get<UserInterface>(
      `${this.baseUrl}/currentUser`
    );
  }

  getCommentsData(): Observable<CommentInterface[]> {
    return this.httpClient.get<CommentInterface[]>(
      `${this.baseUrl}/comments`
    );
  }

  createNewComment( comment: CommentInterface): Observable<CommentInterface> {
    return this.httpClient.post<CommentInterface>(
      `${this.baseUrl}/comments`, comment
    );
  }

  editComment(
    content: string,
    commentId: number | undefined
  ): Observable<CommentInterface> {
    return this.httpClient.patch<CommentInterface>(
      `${this.baseUrl}/comments/${commentId}`,
      {
        content: content,
      }
    );
  }

  removeComment(commentId: number): Observable<{}> {
    return this.httpClient.delete(
      `${this.baseUrl}/comments/${commentId}`
    );
  }

  addReplies(commentId: number | undefined, newReplies: ReplyInterface[] | undefined): Observable<CommentInterface> {
    return this.httpClient.patch<CommentInterface>(
      `${this.baseUrl}/comments/${commentId}`, {
        replies: newReplies
      }
    );
  }

  deleteReply(commentId: number | undefined, newReplies: ReplyInterface[] | undefined): Observable<CommentInterface> {
    return this.httpClient.patch<CommentInterface>(
      `${this.baseUrl}/comments/${commentId}`, {
        replies: newReplies
      }
    );
  }

  editReply(commentId: number | undefined, newReplies: ReplyInterface[] | undefined): Observable<CommentInterface> {
    return this.httpClient.patch<CommentInterface>(
      `${this.baseUrl}/comments/${commentId}`, {
        replies: newReplies
      }
    )
  }

  increaseScore(score: number | undefined, commentId: number | undefined): Observable<CommentInterface>{
    return this.httpClient.patch<CommentInterface>(`${this.baseUrl}/comments/${commentId}`, {
      score: Number(score) + 1
    })
  }

  decreaseScore(score: number | undefined, commentId: number | undefined): Observable<CommentInterface>{
    return this.httpClient.patch<CommentInterface>(`${this.baseUrl}/comments/${commentId}`, {
      score: Number(score) -1
    })
  }
  
}