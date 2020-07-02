/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MailConfirmService } from './mail-confirm.service';

describe('Service: MailConfirm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MailConfirmService]
    });
  });

  it('should ...', inject([MailConfirmService], (service: MailConfirmService) => {
    expect(service).toBeTruthy();
  }));
});
