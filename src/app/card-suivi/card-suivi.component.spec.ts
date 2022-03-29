import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSuiviComponent } from './card-suivi.component';

describe('CardSuiviComponent', () => {
  let component: CardSuiviComponent;
  let fixture: ComponentFixture<CardSuiviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSuiviComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSuiviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
