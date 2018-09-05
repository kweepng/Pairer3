import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JqtreeComponent } from './jqtree.component';

describe('JqtreeComponent', () => {
  let component: JqtreeComponent;
  let fixture: ComponentFixture<JqtreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JqtreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JqtreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
