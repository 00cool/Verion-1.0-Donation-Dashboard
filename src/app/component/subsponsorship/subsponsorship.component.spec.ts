import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsponsorshipComponent } from './subsponsorship.component';

describe('SubsponsorshipComponent', () => {
  let component: SubsponsorshipComponent;
  let fixture: ComponentFixture<SubsponsorshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubsponsorshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsponsorshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
