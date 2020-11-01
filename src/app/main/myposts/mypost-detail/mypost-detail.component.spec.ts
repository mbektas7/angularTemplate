import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MypostDetailComponent } from './mypost-detail.component';

describe('MypostDetailComponent', () => {
  let component: MypostDetailComponent;
  let fixture: ComponentFixture<MypostDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypostDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
