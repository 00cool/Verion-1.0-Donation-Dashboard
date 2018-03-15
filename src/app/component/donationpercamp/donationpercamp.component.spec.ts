import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationpercampComponent } from './donationpercamp.component';

describe('DonationpercampComponent', () => {
  let component: DonationpercampComponent;
  let fixture: ComponentFixture<DonationpercampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonationpercampComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationpercampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
