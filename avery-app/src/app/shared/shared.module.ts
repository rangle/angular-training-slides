import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { SortPipe } from './pipes/sort.pipe';
import { RolldownComponent } from './rolldown/rolldown/rolldown.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ButtonComponent,
    RolldownComponent,
    SortPipe
  ],
  declarations: [
    ButtonComponent,
    SortPipe,
    RolldownComponent
  ]
})
export class SharedModule { }
