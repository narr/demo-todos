import { Component } from '@angular/core';

@Component({
  selector: 'narr-total-count-box',
  styles: [require('./total-count-box.component.scss').toString()],
  template: require('./total-count-box.component.html')
})
export class TotalCountBoxComponent {
  private count: number = 0;
  private txt: string = 'PROJECT';

  getCount(): number {
    return this.count;
  }

  setCount(todoCount: number) {
    this.count = todoCount;
    if (todoCount > 1) {
      this.txt = 'PROJECTS';
    } else {
      this.txt = 'PROJECT';
    }
  }
}
