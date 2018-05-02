import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioManageComponent } from './audio-manage.component';

describe('AudioManageComponent', () => {
  let component: AudioManageComponent;
  let fixture: ComponentFixture<AudioManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
