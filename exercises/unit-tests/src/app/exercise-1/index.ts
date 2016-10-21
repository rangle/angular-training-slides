import { Component } from "@angular/core";

@Component({
  selector: 'rio-exercise-one',
  template: `
    <h1>My First TDD Exercise</h1>
    <div [ngClass]="{'hide' : !visible}">
      <rio-exercise-two></rio-exercise-two>
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
export class ExerciseOneComponent {
  private visible: boolean = true;
  private buttonText: string = 'Hide Message';

  toggleVisibility() {
    this.visible = !this.visible;
    this.buttonText = this.visible ? 'Hide Message' : 'Show Message';
  }
}
