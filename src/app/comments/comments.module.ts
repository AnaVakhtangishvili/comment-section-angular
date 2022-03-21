import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AllCommentsComponent } from './components/all-comments/all-comments.component';
import { CommentComponent } from './components/comment/comment.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { CommentsService } from './services/comments.service';
import { ModalComponent } from './components/modal/modal.component';



@NgModule({
  declarations: [AllCommentsComponent, CommentComponent, CommentFormComponent, ModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [AllCommentsComponent],
  providers: [CommentsService]
})
export class CommentsModule { }
