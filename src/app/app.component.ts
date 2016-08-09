import { Component, OnInit, ViewChild } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

import { ColumnComponent } from './column';
import { TotalCountBoxComponent } from './total-count-box';

@Component({
  selector: 'narr-todos',
  template: require('./app.component.html'),
  styles: [require('./app.component.scss').toString()],
  directives: [ColumnComponent, TotalCountBoxComponent],
  viewProviders: [DragulaService]
})
export class AppComponent implements OnInit {
  private initTodos: string[] = ['Project1', 'Project2', 'Project3', 'Project4'];
  private initProgress: string[] = ['Project5', 'Project6', 'Project7'];
  private initDone: string[] = ['Project8', 'Project9', 'Project10', 'Project11', 'Project12'];

  private narr: string = require('asset/img/ic.narr.128x128.png');

  @ViewChild('total') private totalCountBox: TotalCountBoxComponent;
  @ViewChild('todo') private todoColumn: ColumnComponent;

  constructor(
    private dragulaService: DragulaService
  ) {
    dragulaService.setOptions('bag-column', {
      accepts: (el, target, source, sibling) => {
        let sourceColumn = source.parentElement;
        let targetColumn = target.parentElement;
        if (sourceColumn.classList.contains('todo') &&
          targetColumn.classList.contains('done')) {
          return false;
        }
        if (sourceColumn.classList.contains('done') &&
          targetColumn.classList.contains('todo')) {
          return false;
        }
        return true;
      }
    });
  }

  ngOnInit() {
    let count = this.initTodos.length + this.initProgress.length + this.initDone.length;
    this.totalCountBox.setCount(count);
  }

  private onKeypress($event) {
    if ($event.keyCode === 13) { // enter
      let target = $event.target;
      if (target.value !== '') {
        this.todoColumn.addTodo(target.value);
        target.value = '';
        target.blur();
        this.totalCountBox.setCount(this.totalCountBox.getCount() + 1);
      }
    }
  }
}
