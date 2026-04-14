import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPass } from './select-pass';

describe('SelectPass', () => {
  let component: SelectPass;
  let fixture: ComponentFixture<SelectPass>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectPass],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectPass);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
