import { Component, Input, OnInit } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import {
  ActiveFormInterface,
  CommentInterface,
  ReplyInterface,
  SubmitStateEnum,
  UserInterface,
} from '../../models/comments.model';

@Component({
  selector: 'app-all-comments',
  templateUrl: './all-comments.component.html',
  styleUrls: ['./all-comments.component.scss'],
})
export class AllCommentsComponent implements OnInit {
  @Input() currentUserName: string | undefined;
  @Input() currentUser: UserInterface | undefined;

  commentsData: CommentInterface[] = [];
  initialContent: string = '';
  submitState = SubmitStateEnum;
  activeForm: ActiveFormInterface | null = null;

  constructor(private commmentsService: CommentsService) {}

  ngOnInit(): void {
    this.currentUserInfo();
    this.getComments();
  }

  sortComments() {
    this.commentsData.sort((a, b) => b.score - a.score);
  }

  currentUserInfo(): void {
    this.commmentsService.getCurrentUser().subscribe((info) => {
      this.currentUser = info;
      console.log(this.currentUser);
    });
  }

  getComments(): void {
    this.commmentsService.getCommentsData().subscribe((comments) => {
      this.commentsData = comments;
      this.sortComments();
      console.log(this.commentsData);
    });
  }

  addNewComment({
    content,
    user,
  }: {
    content: string;
    user: UserInterface | undefined;
  }) {
    const newComment: CommentInterface = {
      id: this.commentsData.length + 1,
      content: content,
      createdAt: new Date().toISOString(),
      score: 0,
      user: user,
      replies: [],
    };
    this.commmentsService
      .createNewComment(newComment)
      .subscribe((createdComment) => {
        this.commentsData = [...this.commentsData, createdComment];
        console.log(this.commentsData);
      });
  }

  updateComment({
    commentContent,
    commentId,
  }: {
    commentContent: string;
    commentId: number | undefined;
  }) {
    this.commmentsService
      .editComment(commentContent, commentId)
      .subscribe((editedComment) => {
        this.commentsData = this.commentsData.map((element) => {
          if (element.id === commentId) {
            return editedComment;
          }
          return element;
        });
      });
    this.activeForm = null;
  }

  deleteCommment(commentId: number) {
    this.commmentsService.removeComment(commentId).subscribe(() => {
      this.commentsData = this.commentsData.filter(
        (element) => element.id !== commentId
      );
    });
  }

  addNewReply({
    content,
    replyingTo,
    commentId,
  }: {
    content: string;
    replyingTo: string | undefined;
    commentId: number | undefined;
  }) {
    const rootComment = this.commentsData.find(
      (comment) => comment.id === commentId
    );
    let replies: ReplyInterface[] | undefined = rootComment?.replies;

    const reply: ReplyInterface = {
      id: replies?.length ? replies[replies.length - 1].id + 1 : 1,
      content: content,
      user: this.currentUser,
      createdAt: new Date().toISOString(),
      score: 0,
      replyingTo: replyingTo,
    };

    if (replies) {
      replies = [...replies, reply];
    }

    this.commmentsService
      .addReplies(commentId, replies)
      .subscribe((patchedRootComment) => {
        this.commentsData = this.commentsData.map((comment) => {
          if (comment.id === commentId) {
            return patchedRootComment;
          }
          return comment;
        });
      });
    this.activeForm = null;
  }

  deleteReply({
    replyId,
    commentId,
  }: {
    replyId: number | undefined;
    commentId: number | undefined;
  }) {
    const rootComment = this.commentsData.find(
      (comment) => comment.id === commentId
    );
    const replies = rootComment?.replies.filter(
      (reply) => reply.id !== replyId
    );

    this.commmentsService
      .deleteReply(commentId, replies)
      .subscribe((patchedRootComment) => {
        this.commentsData = this.commentsData.map((comment) => {
          if (comment.id === commentId) {
            return patchedRootComment;
          }
          return comment;
        });
      });
  }

  updateReply({
    replyContent,
    replyId,
    mainCommentId,
  }: {
    replyContent: string;
    replyId: number | undefined;
    mainCommentId: number | undefined;
  }) {
    const rootComment = this.commentsData.find(
      (comment) => comment.id === mainCommentId
    );
    const replies = rootComment?.replies.map((reply) => {
      if (reply.id === replyId) {
        return { ...reply, content: replyContent };
      }
      return reply;
    });

    this.commmentsService
      .editReply(mainCommentId, replies)
      .subscribe((patchedRootComment) => {
        this.commentsData = this.commentsData.map((comment) => {
          if (comment.id === mainCommentId) {
            return patchedRootComment;
          }
          return comment;
        });
      });
  }

  increaseScore({
    score,
    id,
  }: {
    score: number | undefined;
    id: number | undefined;
  }) {
    this.commmentsService.increaseScore(score, id).subscribe((comment) => {
      this.commentsData = this.commentsData.map((element) => {
        if (element.id === id) {
          return comment;
        }
        return element;
      });
      this.sortComments();
    });
  }

  decreaseScore({
    score,
    id,
  }: {
    score: number | undefined;
    id: number | undefined;
  }) {
    this.commmentsService.decreaseScore(score, id).subscribe((comment) => {
      this.commentsData = this.commentsData.map((element) => {
        if (element.id === id) {
          return comment;
        }
        return element;
      });
      this.sortComments();
    });
  }

  activatingForm(activating: ActiveFormInterface): void {
    this.activeForm = activating;
  }
}
