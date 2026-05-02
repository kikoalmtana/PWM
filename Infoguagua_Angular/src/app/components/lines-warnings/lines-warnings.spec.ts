import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinesWarnings } from './lines-warnings';

describe('LinesWarnings', () => {
  let component: LinesWarnings;
  let fixture: ComponentFixture<LinesWarnings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinesWarnings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinesWarnings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
