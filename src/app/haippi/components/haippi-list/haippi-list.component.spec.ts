import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HaippiListComponent } from './haippi-list.component';

describe('HaippiListComponent', () => {
  let component: HaippiListComponent;
  let fixture: ComponentFixture<HaippiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HaippiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HaippiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
