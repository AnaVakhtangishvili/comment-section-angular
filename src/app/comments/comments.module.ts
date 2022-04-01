import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AllCommentsComponent } from './components/all-comments/all-comments.component';
import { CommentComponent } from './components/comment/comment.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { CommentsService } from './services/comments.service';
import { ReplyComponent } from './components/reply/reply.component';
import { TimeAgoPipe } from './pipes/timeAgo.pipe';

@NgModule({
  declarations: [
    AllCommentsComponent,
    CommentComponent,
    CommentFormComponent,
    ReplyComponent,
    TimeAgoPipe,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [AllCommentsComponent],
  providers: [CommentsService],
})
export class CommentsModule {}
