import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CevaplarimComponent } from './cevaplarim.component';

describe('CevaplarimComponent', () => {
  let component: CevaplarimComponent;
  let fixture: ComponentFixture<CevaplarimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CevaplarimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CevaplarimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
