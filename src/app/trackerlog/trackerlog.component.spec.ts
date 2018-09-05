import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerlogComponent } from './trackerlog.component';

describe('TrackerlogComponent', () => {
  let component: TrackerlogComponent;
  let fixture: ComponentFixture<TrackerlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
