import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';

@Injectable()
export class TodoService {

  constructor(private http : Http,
              private storeService : Store<any>
  ) { 
  }

  getDefaultTodoList(){
    console.time('defaultListLoaded');
    this.http.get('http://www.json-generator.com/api/json/get/bHbBeYXhnS')
      .map((data) => data.json())
      .subscribe((jsonData) => {
        console.timeEnd('defaultListLoaded');
        let formattedTasks = jsonData.map((task) => {
          return this.getTodoTaskForDisplay(task.label, task.done);
        });
        this.storeService.dispatch({
          type: 'DEFAULT_TODO_LIST_LOADED',
          payload: formattedTasks
        });
      });
  }

  getTodoTaskForDisplay(label, isComplete){
    return {
      label: label,
      isComplete: isComplete
    }
  }

}
