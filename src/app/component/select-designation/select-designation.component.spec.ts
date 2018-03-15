import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDesignationComponent } from './select-designation.component';

describe('SelectDesignationComponent', () => {
  let component: SelectDesignationComponent;
  let fixture: ComponentFixture<SelectDesignationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectDesignationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDesignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
