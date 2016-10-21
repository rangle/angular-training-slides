import { Component, OnInit } from "@angular/core";
import { MessageService } from '../services/message';

@Component({
  selector: 'rio-exercise-two',
  template: `<h2>{{ message }}</h2>`
})
export class ExerciseTwoComponent implements OnInit {
  private message: string = '';

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.message = this.messageService.getMessage();
  }
}
