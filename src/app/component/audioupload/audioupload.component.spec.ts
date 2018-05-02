import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudiouploadComponent } from './audioupload.component';

describe('AudiouploadComponent', () => {
  let component: AudiouploadComponent;
  let fixture: ComponentFixture<AudiouploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudiouploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudiouploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
