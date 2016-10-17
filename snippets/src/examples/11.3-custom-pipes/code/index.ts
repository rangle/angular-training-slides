import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `Shout: {{ text | shout }}, Exclaim: {{ text | shout:true }}`,
})
export class AppComponent {
  text = 'hello world'
}
