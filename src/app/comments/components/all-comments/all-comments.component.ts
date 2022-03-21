import { Component, Input, OnInit } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { CommentInterface, formStateInterface } from '../../types/interfaces';

@Component({
  selector: 'app-all-comments',
  templateUrl: './all-comments.component.html',
  styleUrls: ['./all-comments.component.scss']
})
export class AllCommentsComponent implements OnInit {
  @Input() currentUserName!: string;

  commentsArray: CommentInterface[] = [];
  mainCommentsArray: CommentInterface[] = [];
  openForm: formStateInterface | null = null;
  increaseDisable!:boolean;
  deleteIsClicked!:boolean;

  constructor(private commentsService: CommentsService) { }

  ngOnInit(): void {
    this.commentsService.getComments().subscribe( comments => this.commentsArray = comments);
  }

  addNewComment({commentText, parentId}: {commentText: string, parentId: number | null}): void {
    this.commentsService.createNewComment(commentText, parentId).subscribe(newComment => {
      this.commentsArray = [...this.commentsArray, newComment];
      this.openForm = null;
    });
  }

  getMainComments(): CommentInterface[] {
    this.mainCommentsArray = this.commentsArray.filter(comment => comment.parentId === null);
    return this.mainCommentsArray;
  }
  
  getReplies(commentId: number): CommentInterface[] {
    return this.commentsArray.filter(comment => comment.parentId === commentId);
  }

  updateComment({commentText, commentId, createdAt}: {commentText: string, commentId: number, createdAt: string}) { 
    this.commentsService.updateComment(commentText, commentId, createdAt).subscribe(editedComment => {
      this.commentsArray = this.commentsArray.map(comment => {
        if (comment.id  === commentId) {
          return editedComment;
        }
        return comment;
      });
      this.openForm = null;
    })
  }

  deleteComment(commentId: number): void {
    this.commentsService.deleteComment(commentId).subscribe(() => {
      this.commentsArray = this.commentsArray.filter(comment => comment.id !== commentId);
    });
    this.deleteIsClicked = false;
  }

  activateForm(activateForm: formStateInterface): void {
    this.openForm = activateForm;
  }

  increaseScore(commentId: number, commentScore: number) {
    this.commentsArray.filter(comment =>  {
      if (comment.id === commentId ) {
        comment.score++;
      }
   })
  }

  decreaseScore(commentId: number, commentScore: number): void {
    this.commentsArray.filter(comment => {
      if (comment.id === commentId) {
        comment.score--;
      }
   });
  }
}