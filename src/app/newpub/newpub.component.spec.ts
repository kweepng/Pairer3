import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewpubComponent } from './newpub.component';

describe('NewpubComponent', () => {
  let component: NewpubComponent;
  let fixture: ComponentFixture<NewpubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewpubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewpubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
