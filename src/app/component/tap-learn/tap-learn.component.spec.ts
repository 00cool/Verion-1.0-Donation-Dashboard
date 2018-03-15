import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TapLearnComponent } from './tap-learn.component';

describe('TapLearnComponent', () => {
  let component: TapLearnComponent;
  let fixture: ComponentFixture<TapLearnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TapLearnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TapLearnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
