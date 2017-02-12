import { Component, EventEmitter, Input, Output } from '@angular/core'

const MS_IN_SECOND = 1000;

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent {
  @Input() interval: number = 50;
  @Output() onInterval = new EventEmitter();
  @Output() onReset = new EventEmitter();
  @Output() onStop = new EventEmitter();
  private time: number = 0;
  private timerId: number;

  start(): void {
    if (this.timerId) {
      return;
    }

    this.timerId = window.setInterval(() => {
      this.time = this.computeTime(this.time, this.interval);
      this.onInterval.emit(this.time);
    }, this.interval);
  }

  stop(): void {
    window.clearInterval(this.timerId);
    this.timerId = null;
    this.onStop.emit(this.time);
  }

  reset(): void {
    this.time = 0;
    this.onReset.emit(this.time);
  }

  private computeTime(time: number, interval: number): number {
    const nextTime = time + interval / MS_IN_SECOND;
    return Math.round(nextTime * MS_IN_SECOND) / MS_IN_SECOND;
  }
}