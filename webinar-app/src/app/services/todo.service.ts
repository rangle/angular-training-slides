import { Injectable } from '@angular/core';

@Injectable()
export class TodoService {
  tasks : Array<Object> = [];

  constructor() { 
    this.addTask('task 1');
    this.addTask('task 2');
    this.addTask('task 3');
  }

  getTasks(){
    return this.tasks;
  }

  addTask(taskInput : string){
    this.tasks.push({
      label: taskInput,
      isComplete: false
    });
  }
  
  completeTask(index: number){
    let taskToComplete : any = this.tasks[index];
    taskToComplete.isComplete = !taskToComplete.isComplete;
  }

  deleteTask(index: number){
    this.tasks.splice(index, 1);
  }
}
