import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPass } from './add-pass';

describe('AddPass', () => {
  let component: AddPass;
  let fixture: ComponentFixture<AddPass>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPass],
    }).compileComponents();

    fixture = TestBed.createComponent(AddPass);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
