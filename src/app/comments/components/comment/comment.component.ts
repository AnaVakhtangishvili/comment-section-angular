import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ActiveFormInterface,
  ButtonActionEnum,
  CommentInterface,
  FormStateEnum,
  SubmitStateEnum,
  UserInterface,
} from '../../models/comments.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comment: CommentInterface | undefined;
  @Input() currentUserName: string | undefined;
  @Input() currentUser: UserInterface | undefined;
  @Input() submitState = SubmitStateEnum;
  @Input() initialContent: string = '';
  @Input() activeForm!: ActiveFormInterface | null;

  @Output() updateComment = new EventEmitter<{
    commentContent: string;
    commentId: number | undefined;
  }>();
  @Output() deleteComment = new EventEmitter<number>();
  @Output() activatingForm = new EventEmitter<ActiveFormInterface>();
  @Output() OnIncreaseScore = new EventEmitter<{
    score: number | undefined;
    id: number | undefined;
  }>();
  @Output() OnDecreaseScore = new EventEmitter<{
    score: number | undefined;
    id: number | undefined;
  }>();
  @Output() onSubmitReply = new EventEmitter<{content: string, replyingTo: string | undefined,commentId: number | undefined}>();
  @Output() onSubmitReplyOfReplyHandler = new EventEmitter<{content: string, replyingTo: string | undefined,commentId: number | undefined}>();
  @Output() onDeleteReplyHandler = new EventEmitter<{replyId: number | undefined,commentId: number | undefined}>();
  @Output() onUpdateReplyHandler = new EventEmitter<{replyContent: string, replyId: number | undefined, mainCommentId: number | undefined}>();
  
  
  
  buttonAction = ButtonActionEnum;
  canReply: boolean = false;
  canEdit: boolean = false;
  canDelete: boolean = false;
  formState = FormStateEnum;

  constructor() {}

  ngOnInit(): void {
    this.canActions();
    // this.timeAgo();
  }

  canActions() {
    this.canReply = this.comment?.user?.username !== this.currentUser?.username;
    this.canEdit = this.comment?.user?.username === this.currentUser?.username;
    this.canDelete =
      this.comment?.user?.username === this.currentUser?.username;
  }

  replying(): boolean {
    if (!this.activeForm) {
      return false;
    }
    return (
      this.activeForm.id === this.comment?.id &&
      this.activeForm.state === this.formState.replying
    );
  }

  editing(): boolean {
    if (!this.activeForm) {
      return false;
    }
    return (
      this.activeForm.id === this.comment?.id &&
      this.activeForm.state === this.formState.editing
    );
  }

  submitReply(content: string) {
    this.onSubmitReply.emit({content, replyingTo: this.comment?.user?.username, commentId: this.comment?.id})
  }

  submitReplyOfReplyHandler({content, replyingTo}: {content: string, replyingTo: string | undefined}) {
    this.onSubmitReplyOfReplyHandler.emit({content, replyingTo, commentId: this.comment?.id});
  }

  
  deleteReplyHandler(replyId: number | undefined) {
    this.onDeleteReplyHandler.emit({replyId, commentId: this.comment?.id})
  }

  updateReplyHandler({replyContent, replyId}: {replyContent: string, replyId: number | undefined}) {
    this.onUpdateReplyHandler.emit({replyContent, replyId, mainCommentId: this.comment?.id})
  }
  
  increaseScore({score, id}: {score: number | undefined, id: number | undefined}) {
    this.OnIncreaseScore.emit({score: score, id: id})
  }

  decreaseScore({score, id}: {score: number | undefined, id: number | undefined}) {
    this.OnDecreaseScore.emit({score: score, id: id})
  }
  decreaseReplyScoreHndler({score, id}: { score: number | undefined, id: number | undefined }) {
    // this.onDecreaseReplyScoreHndler.emit({score: score, id: id})
  }

}
