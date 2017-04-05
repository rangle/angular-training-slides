import { Component } from '@angular/core';
import { TodoService } from './services/todo.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title : string = 'TODO List Application!';

  constructor(private storeSerice : Store<any>,
              private todoService: TodoService
  ){}

  ngOnInit(){
    this.todoService.getDefaultTodoList();
  }

  addTask(taskInput : string){
    this.storeSerice.dispatch({
      type: 'TODO_TASK_ADDED',
      payload : taskInput
    })
  }

}
