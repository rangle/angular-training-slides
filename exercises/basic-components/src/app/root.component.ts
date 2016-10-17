import { Component, Input } from "@angular/core";

/**
 * 
 * 
 * @export
 * @class RootComponent
 */
@Component({
  selector: 'rio-root',
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
      <my-parent></my-parent>
    </div>
  `,
  styles: [`
    p {
      color: blue;
    }
  `]
})
export class RootComponent {
  public greeting: string = "Hello, world!";

  constructor () {}
}

/**
 * 
 * 
 * @export
 * @class Parent
 */
@Component({
  selector: 'my-parent',
  template: `
    <h2>I am a parent component</h2>
      <div>
        <child-one
          [helloToMe] = "helloChildOne"
          [colors]    = "colors"
        ></child-one>
        <button
          (click) = "isVisible()"
        >
          Show the hidden second child component
        </button>
        <child-two [isVisible]="showChildTwo"></child-two>
      </div>
  `
})

export class Parent {
  public helloChildOne:   string = 'Hello to my first child';
  public showChildTwo:    boolean = true;
  public colors:          string[] = ['red', 'green', 'blue'];

  public isVisible(): boolean {
    this.showChildTwo = (this.showChildTwo == true) ? false : true;
    return this.showChildTwo;
  }
}

/**
 * 
 * 
 * @export
 * @class ChildOne
 */
@Component({
  selector: 'child-one',
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

export class ChildOne {
  @Input() helloToMe:   string;
  @Input() colors:      string[];
}

/**
 * 
 * 
 * @export
 * @class ChildTwo
 */
@Component({
  selector: 'child-two',
  template: `
    <h2>I am Child Two</h2>
    <div *ngIf="isVisible">
      Child Two: I will only show up if 'showChildTwo' property on parent component is = true
    </div>
  `
})

export class ChildTwo {
  @Input() isVisible: boolean;
}