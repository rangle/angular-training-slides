import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ExerciseOneComponent } from './exercise-1';
import { ExerciseTwoComponent } from './exercise-2';

@NgModule({
  imports: [BrowserModule],
  declarations: [
    ExerciseOneComponent,
    ExerciseTwoComponent,
  ],
  bootstrap: [
    ExerciseOneComponent,
    ExerciseTwoComponent,
  ]
})
export class AppModule {}
