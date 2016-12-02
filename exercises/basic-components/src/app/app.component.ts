import { Component, Input } from "@angular/core";

@Component({
  selector: 'rio-app',
  template: `
    <h2>The goal of this exercise:</h2>
    <ul>
      <li>* Create two custom child components of this one</li>
      <li>Use at least one *ngIf</li>
      <li>Use at least one *ngFor</li>
      <li>Respond to a user action</li>
      <li>Ensure there is no state on the child components</li>
    </ul>
    <p>Below is a potential solution:</p>
    <div>
      <rio-parent></rio-parent>
    </div>
  `,
  styles: [`
    p {
      color: blue;
    }
  `]
})
export class AppComponent {
  greeting = 'Hello, world!';
}

@Component({
  selector: 'rio-parent',
  template: `
    <h2>I am a parent component</h2>
      <div>
        <rio-child-one [helloToMe]="helloChildOne" [colors]="colors"></rio-child-one>
        <button (click)="toggle()">
          Show the hidden second child component
        </button>
        <rio-child-two [isVisible]="showChildTwo"></rio-child-two>
      </div>
  `
})

export class ParentComponent {
  helloChildOne = 'Hello to my first child';
  showChildTwo = true;
  colors = ['red', 'green', 'blue'];

  toggle(): void {
    this.showChildTwo = !this.showChildTwo;
  }
}

@Component({
  selector: 'rio-child-one',
  template: `
    <h2>I am Child One</h2>
    <div>
      Msg from Parent says: {{helloToMe}}<br />
      Here is an array of colors using *ngFor:<br />
      <ul>
        <li *ngFor="let color of colors">{{color}}</li>
      </ul>
    </div>
  `
})

export class ChildOneComponent {
  @Input() helloToMe:   string;
  @Input() colors:      string[];
}

@Component({
  selector: 'rio-child-two',
  template: `
    <h2>I am Child Two</h2>
    <div *ngIf="isVisible">
      Child Two: I will only show up if 'showChildTwo' property on parent component is = true
    </div>
  `
})

export class ChildTwoComponent {
  @Input() isVisible: boolean;
}