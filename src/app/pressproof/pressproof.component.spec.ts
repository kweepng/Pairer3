import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PressproofComponent } from './pressproof.component';

describe('PressproofComponent', () => {
  let component: PressproofComponent;
  let fixture: ComponentFixture<PressproofComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PressproofComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PressproofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
