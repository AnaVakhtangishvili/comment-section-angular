import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentInterface } from '../../types/interfaces';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {
  @Input() submitStatus!: string;
  @Input() comment!: CommentInterface;
  @Input() initialText: string = '';

  @Output() submitHandler = new EventEmitter<string>();

  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      text: [this.initialText, Validators.required]
    })
  }

  onSubmit() {
    this.submitHandler.emit(this.form.value.text);
    this.form.reset();
  }
}
