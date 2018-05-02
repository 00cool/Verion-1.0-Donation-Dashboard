import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyCourseComponent } from './weekly-course.component';

describe('WeeklyCourseComponent', () => {
  let component: WeeklyCourseComponent;
  let fixture: ComponentFixture<WeeklyCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
