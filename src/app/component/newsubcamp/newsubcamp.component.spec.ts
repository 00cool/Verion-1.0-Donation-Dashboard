import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsubcampComponent } from './newsubcamp.component';

describe('NewsubcampComponent', () => {
  let component: NewsubcampComponent;
  let fixture: ComponentFixture<NewsubcampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsubcampComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsubcampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
