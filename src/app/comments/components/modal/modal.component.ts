import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommentInterface } from '../../models/comments.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() comment!: CommentInterface;

  @Output() deleteComment = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

}
