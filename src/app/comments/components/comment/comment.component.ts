import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { formStateEnum } from '../../types/emuns';
import { CommentInterface, formStateInterface } from '../../types/interfaces';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment!: CommentInterface;
  @Input() currentUserName!: string;
  @Input() replaysArray!: CommentInterface[];
  @Input() openForm!: formStateInterface | null;
  @Input() parentId!: number | null;
  @Input() increaseDisable: boolean = false;
  @Input() deleteIsClicked: boolean = false;

  @Output() activateForm = new EventEmitter<formStateInterface>();
  @Output() addNewReply = new EventEmitter<{commentText: string, parentId: number | null}>();
  @Output() updateComment = new EventEmitter<{commentText: string, commentId: number, createdAt: string}>();
  @Output() deleteComment = new EventEmitter<number>();
  @Output() increaseScore = new EventEmitter<{commentId:number, commentScore: number}>();
  @Output() decreaseScore = new EventEmitter<{commentId:number, commentScore: number}>();
  @Output() throwId = new EventEmitter<number>();

  canReply: boolean = false;
  canEdit: boolean = false;
  canDelete: boolean = false;
  formState = formStateEnum;
  replyId: number | null = null;

  constructor() { }

  ngOnInit(): void {
    this.canReply = Boolean(this.currentUserName) && this.comment.user.username !== this.currentUserName;
    this.canEdit = this.currentUserName === this.comment.user.username;
    this.canDelete = this.currentUserName === this.comment.user.username;
    this.replyId = this.parentId ? this.parentId : this.comment.id;
  }

  replying(): boolean {
    if (!this.openForm) {
      return false;
    }
    return this.openForm.id === this.comment.id && this.openForm.state === this.formState.replying;
  }

  editing(): boolean {
    if (!this.openForm) {
      return false;
    }
    return this.openForm.id === this.comment.id && this.openForm.state === this.formState.editing;
  }

  getDate(commentDate: string): string {
    const passedTime =  new Date().getTime() - new Date(commentDate).getTime();
    if (passedTime < 60000) {
      return "seconds ago";
    } else if (passedTime >= 60000 && passedTime < 60*60000) {
      return `${Math.floor(passedTime / 60000)} minutes ago`;
    } else if (passedTime >= 60*60000 && passedTime < 24*60*60000) {
      return `${Math.round(passedTime / 60*60000)} hours ago`;
    } else if (passedTime >= 24*60*60000 && passedTime < 30*24*60*60000) {
      return `${Math.floor(passedTime / 24*60*60000)} days ago`;
    } else {
      return 'long ago';
    }
  }
}
