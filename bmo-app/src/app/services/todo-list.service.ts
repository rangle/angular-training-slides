import { Injectable } from '@angular/core';
import { TodoListItem } from '../models/todo-list-item';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TodoListService {
  private itemList: TodoListItem[] = [];

  constructor(private http: Http) { }

  addTask(item: TodoListItem) {
    this.itemList.push(item);
  }

  getTodoList() {
    return this.itemList;
  }

  deleteTask(index) {
    this.itemList.splice(index, 1);
  }

  completeTask(index){
    this.itemList[index].isComplete = true;
  }

  getDefaultList() {
    this.http.get('http://www.json-generator.com/api/json/get/bHbBeYXhnS')

      .map((result) => {
        return result.json();
      })
      .map((apiResult) => {
        return apiResult.map((apiResultItem) => {
          return new TodoListItem(apiResultItem.label, apiResultItem.done);
        });
      })
      .subscribe((itemList) => {
        this.itemList = itemList;
      });
  }
}
