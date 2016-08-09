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

import { TotalCountBoxComponent } from './total-count-box.component';

describe('TotalCountBoxComponent', () => {
  beforeEachProviders(() => [
    TotalCountBoxComponent
  ]);

  it('should return a singular form of String when count is 1', inject([TotalCountBoxComponent],
    tcbComp => {
      tcbComp.setCount(1);

      const subject = tcbComp.getCount();
      const subject2 = tcbComp.txt;
      const result = 1;
      const result2 = 'PROJECT';

      expect(subject).toEqual(result);
      expect(subject2).toEqual(result2);
    }));

  it('should return a plural form of String when count is bigger than 1',
    inject([TotalCountBoxComponent], tcbComp => {
      tcbComp.setCount(2);

      const subject = tcbComp.getCount();
      const subject2 = tcbComp.txt;
      const result = 2;
      const result2 = 'PROJECTS';

      expect(subject).toEqual(result);
      expect(subject2).toEqual(result2);
    }));
});
