import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonActionEnum, ReplyInterface, SubmitStateEnum, UserInterface } from '../../models/comments.model';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {
  @Input() reply: ReplyInterface | undefined;
  @Input() currentUser: UserInterface | undefined;

  @Output() onIncreaseReplyScore: EventEmitter<{
    score: number | undefined;
    id: number | undefined;
  }> = new EventEmitter<{
    score: number | undefined;
    id: number | undefined;
  }>();
  @Output() onDecreaseReplyScore: EventEmitter<{
    score: number | undefined;
    id: number | undefined;
  }> = new EventEmitter<{
    score: number | undefined;
    id: number | undefined;
  }>();
  @Output() onDeleteReply: EventEmitter<number> = new EventEmitter<number>();
  @Output() onUpdateReply: EventEmitter<{replyContent:string, replyId: number | undefined}> = new EventEmitter<{replyContent:string, replyId: number | undefined}>();
  @Output() onSubmitReplyOfReply: EventEmitter<{content:string, replyingTo: string | undefined}> = new EventEmitter<{content:string, replyingTo: string | undefined}>();
  
  
  buttonAction = ButtonActionEnum;
  submitState = SubmitStateEnum;
  activateReplyForm = false;
  activateEditForm = false;

  constructor() { }

  ngOnInit() {
  }

  toggleReply() {
    this.activateReplyForm = !this.activateReplyForm;
  }

  toggleEdit() {
    this.activateEditForm = !this.activateEditForm;
  }

  increaseReplyScore({score, id}: {score: number | undefined, id: number | undefined}) {
    this.onIncreaseReplyScore.emit({score: score, id: id});
  }

  decreaseReplyScore({score, id}: {score: number | undefined, id: number | undefined}) {
    this.onDecreaseReplyScore.emit({score: score, id: id});
  }

  deleteReply() {
    this.onDeleteReply.emit(this.reply?.id);
  }

  updateReply(replyContent: string) {
    this.onUpdateReply.emit({replyContent, replyId: this.reply?.id});
    this.toggleEdit(); 
  }

  submitReplyOfReply(content: string) {
    this.onSubmitReplyOfReply.emit({content, replyingTo: this.reply?.user?.username})
  }
}
