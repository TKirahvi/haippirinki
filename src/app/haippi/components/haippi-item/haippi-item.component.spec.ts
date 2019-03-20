import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HaippiItemComponent } from './haippi-item.component';

describe('HaippiItemComponent', () => {
  let component: HaippiItemComponent;
  let fixture: ComponentFixture<HaippiItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HaippiItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HaippiItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
