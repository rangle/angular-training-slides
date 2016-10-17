import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  template: `
    <div>
      Configurable Input:
      <input [type]="inputType" [value]="label">
    </div>
    <div>
      Label The Input:
      <input type="text" (change)="changeLabel($event)">
      Change The Input:
      <select (change)="changeType($event)">
        <option value="text" selected>text</option> 
        <option value="password">password</option> 
        <option value="button">button</option> 
      </select>
    </div>
`,
})
export class AppComponent {
  inputType: string = 'text';
  label: string = 'configurable';

  changeLabel(event) {
    this.label = event.target.value;
  }

  changeType(event) {
    this.inputType = event.target.value;
  }
}
