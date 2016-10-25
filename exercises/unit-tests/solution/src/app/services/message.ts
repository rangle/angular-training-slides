import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
  public message: string = 'Hello World';

  public getMessage() {
    return this.message;
  }
}
