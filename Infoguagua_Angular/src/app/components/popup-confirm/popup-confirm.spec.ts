import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupConfirm } from './popup-confirm';

describe('PopupConfirm', () => {
  let component: PopupConfirm;
  let fixture: ComponentFixture<PopupConfirm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupConfirm],
    }).compileComponents();

    fixture = TestBed.createComponent(PopupConfirm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
