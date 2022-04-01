import { Component, OnInit } from '@angular/core';
import { UserInterface } from './comments/models/comments.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'comment-section-newest';

  currentUser: UserInterface | undefined;

  ngOnInit(): void {
  }
}
