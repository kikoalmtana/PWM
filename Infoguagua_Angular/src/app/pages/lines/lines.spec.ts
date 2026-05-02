import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lines } from './lines';

describe('Lines', () => {
  let component: Lines;
  let fixture: ComponentFixture<Lines>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lines],
    }).compileComponents();

    fixture = TestBed.createComponent(Lines);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
