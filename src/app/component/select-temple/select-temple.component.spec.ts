import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTempleComponent } from './select-temple.component';

describe('SelectTempleComponent', () => {
  let component: SelectTempleComponent;
  let fixture: ComponentFixture<SelectTempleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectTempleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTempleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
