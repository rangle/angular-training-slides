import { Component } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  inputUrl: string;
  output: string;
  show = false;

  constructor(private httpClient: HttpClientService) { }

  onGetClick() {
    this.httpClient.get(this.inputUrl).subscribe({ next: this.onGotResponse.bind(this), error: this.onGotError.bind(this) });
  }

  onGotResponse(response: any) {
    this.output = response;
    this.show = true;
  }

  onGotError(error: any) {
    this.output = error;
    this.show = true;
  }

}
