import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
  public message = 'Hello World';

  public getMessage(): string {
    return this.message;
  }
}
