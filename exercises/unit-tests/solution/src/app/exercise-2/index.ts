import { Component, OnInit } from "@angular/core";
import { MessageService } from '../services/message';

@Component({
  selector: 'rio-message',
  template: `<h2>{{ message }}</h2>`
})
export class MessageComponent implements OnInit {
  private message: string = '';

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.message = this.messageService.getMessage();
  }
}
