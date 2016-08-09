import { AfterViewInit, ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { Dragula, DragulaService } from 'ng2-dragula/ng2-dragula';

import { TotalCountBoxComponent } from '../total-count-box';

@Component({
  selector: 'narr-column',
  styles: [require('./column.component.scss').toString()],
  template: require('./column.component.html'),
  directives: [Dragula, TotalCountBoxComponent]
})
export class ColumnComponent implements AfterViewInit {
  @Input() private title: string;
  @Input() private data: string[];
  @ViewChild(TotalCountBoxComponent)
  private totalCountBoxComponent: TotalCountBoxComponent;

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private dragulaService: DragulaService
  ) {
    dragulaService.drop.subscribe(value => {
      let targetColumn = value[2].parentElement;
      let sourceColumn = value[3].parentElement;
      if (targetColumn.classList.contains(this.title)) {
        this.onDrop(value[2]);
      } else if (sourceColumn.classList.contains(this.title)) {
        this.onDrop(value[3]);
      }
    });
  }

  addTodo(str: string) {
    if (this.title === 'todo') {
      // console.log(this.data);
      this.data.push(str);
      this.totalCountBoxComponent.setCount(this.data.length);
    }
  }

  ngAfterViewInit() {
    this.totalCountBoxComponent.setCount(this.data.length);
    // TODO: https://github.com/angular/angular/issues/6005
    this.changeDetectionRef.detectChanges();
  }

  private onDrop(todosEl) {
    // after drop, synchronizing with data took time if the accepts option is set
    // TOOD: find a better solution instead of setTimeout
    setTimeout(() => {
      // console.log(this.data.length);
      this.totalCountBoxComponent.setCount(this.data.length);
    }, 20);
  }

  private setTitle(title: string) {
    let txt;
    switch (title) {
      case 'todo':
        txt = 'To do';
        break;
      case 'progress':
        txt = 'In Progress';
        break;
      case 'done':
        txt = 'Done';
        break;
      default:
        txt = '';
    }
    return txt;
  }
}
