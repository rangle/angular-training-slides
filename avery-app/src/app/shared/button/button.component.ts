import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit
} from '@angular/core';

@Component({
  selector: 'avy-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() label: string;
  @Output() onLabel = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  setLabel(label: string) {
    this.onLabel.emit(label);
  }

}
