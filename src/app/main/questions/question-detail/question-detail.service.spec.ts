import { TestBed } from '@angular/core/testing';

import { QuestionDetailService } from './question-detail.service';

describe('QuestionDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuestionDetailService = TestBed.get(QuestionDetailService);
    expect(service).toBeTruthy();
  });
});
