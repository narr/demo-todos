import {
  afterEach,
  async,
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  inject,
  it
} from '@angular/core/testing';
import { ChangeDetectorRef, provide } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { ColumnComponent } from './column.component';

describe('ColumnComponent', () => {
  let dragulaService;

  beforeEach(() => {
    dragulaService = {
      drop: {
        subscribe: f => f
      }
    };
  });

  beforeEachProviders(() => [
    ColumnComponent,
    provide(ChangeDetectorRef, { useValue: ChangeDetectorRef }),
    provide(DragulaService, { useValue: dragulaService })
  ]);

  it('should return a right title for column names', inject([ColumnComponent],
    columnComponent => {
      const subject = columnComponent.setTitle('todo');
      const subject2 = columnComponent.setTitle('progress');
      const subject3 = columnComponent.setTitle('done');
      const subject4 = columnComponent.setTitle('nothing');

      const result = 'To do';
      const result2 = 'In Progress';
      const result3 = 'Done';
      const result4 = '';

      expect(subject).toEqual(result);
      expect(subject2).toEqual(result2);
      expect(subject3).toEqual(result3);
      expect(subject4).toEqual(result4);
    }));
});
