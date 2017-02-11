import { Component } from '@angular/core';
import { HttpClientService } from './http-client.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private httpClient: HttpClientService) { }

  onGetClick(){
    
  }

}
