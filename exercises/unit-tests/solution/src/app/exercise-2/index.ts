import { Component, OnInit } from "@angular/core";
import { MessageService } from '../services/message';

@Component({
  selector: 'rio-message',
  template: `<h2>{{ message }}</h2>`
})
export class MessageComponent implements OnInit {
  message = '';

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.message = this.messageService.getMessage();
  }
}
