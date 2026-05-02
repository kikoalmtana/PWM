import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CURDLines } from './curd-lines';

describe('CURDLines', () => {
  let component: CURDLines;
  let fixture: ComponentFixture<CURDLines>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CURDLines]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CURDLines);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
