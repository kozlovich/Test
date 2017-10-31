import { Component } from '@angular/core';
//import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'TODO List App';
  completed : any;

  //date = new FormControl(new Date());

  newTodo: string;
  todos: any;
  todoObj: any;
  date = new Date();
  localStorageKey = 'ToDoList Raketskaya';

  constructor() {
    this.newTodo = '';
    this.todos = [];

    if (localStorage.getItem(this.localStorageKey)) {
      this.todos = JSON.parse(localStorage.getItem(this.localStorageKey));
    }
  }

  addTodo(event) {
    this.todoObj = {
      newTodo: this.newTodo,
      completed: false,
      id: this.todos.length,
      dueDate: this.date.toDateString()
    }

    this.todos.push(this.todoObj);
    this.saveToLocal(this.todos);
    this.newTodo = '';
    event.preventDefault();
  }

  saveToLocal(todos): void {
    if (localStorage.getItem(this.localStorageKey)) {
      localStorage.removeItem(this.localStorageKey);
    }
      localStorage.setItem(this.localStorageKey,JSON.stringify(todos));
      console.log(todos);

  /*  if (!localStorage.getItem(this.localStorageKey)) {
      localStorage.setItem(this.localStorageKey,JSON.stringify(todos));
      console.log(todos);
    }
    else
    {
      localStorage.removeItem(this.localStorageKey);
      localStorage.setItem(this.localStorageKey,JSON.stringify(todos));
      console.log(todos);
    } */

  }

  selectTodos(selected, index) {
    this.todos[index].completed = selected;
    this.saveToLocal(this.todos);
    console.log("selectTodos is working");
    console.log(this.todos[0].completed);
  }

  deleteSelectedTodos() {
    for(var i=(this.todos.length -1); i >= 0; i--) {
      if(this.todos[i].completed) {
        this.todos.splice(i, 1);
      }
    }
  this.saveToLocal(this.todos);
  }

}
