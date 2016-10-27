import { Component } from "@angular/core";

@Component({
  selector: 'rio-app',
  template: `
    <h1>My First TDD Exercise</h1>
    <div [ngClass]="{'hide' : !visible}">
      <rio-message></rio-message>
    </div>
    <button (click)="toggleVisibility()" type="button">
      {{ buttonText }}
    </button>
  `,
  styles: [`
    .hide {
      display: none;
    }
  `]
})
export class AppComponent {
  public visible: boolean = true;
  private buttonText: string = 'Hide Message';

  toggleVisibility() {
    this.visible = !this.visible;
    this.buttonText = this.visible ? 'Hide Message' : 'Show Message';
  }
}
