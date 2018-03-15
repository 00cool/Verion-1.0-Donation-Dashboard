import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubCampComponent } from './add-sub-camp.component';

describe('AddSubCampComponent', () => {
  let component: AddSubCampComponent;
  let fixture: ComponentFixture<AddSubCampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSubCampComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubCampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
