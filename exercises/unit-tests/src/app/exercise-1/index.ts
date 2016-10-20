import { Component } from "@angular/core";

@Component({
  selector: 'rio-exercise-one',
  template: `
    <h1>My First TDD Exercise</h1>
    <div [ngClass]="{'hide' : !visible}">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .hide {
      display: none;
    }
  `]
})
export class ExerciseOneComponent {
  private visible: boolean = true;

  toggleVisibility() {
    this.visible = !this.visible;
  }
}
