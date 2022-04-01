import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubmitStateEnum, UserInterface } from '../../models/comments.model';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {
  @Input() currentUser: UserInterface | undefined;
  @Input() initialContent: string | undefined = '';
  @Input() submitState: string | undefined;

  @Output() submitHandler = new EventEmitter <string>();

  constructor(private formBuilder: FormBuilder) { }

  form!: FormGroup;

  submitForm() {
    this.submitHandler.emit(this.form.value.commentContent);
    this.form.reset();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      commentContent: [this.initialContent, Validators.required]
    })
  }

}
