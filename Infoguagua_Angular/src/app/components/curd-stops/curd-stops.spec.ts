import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CURDStops } from './curd-stops';

describe('CURDStops', () => {
  let component: CURDStops;
  let fixture: ComponentFixture<CURDStops>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CURDStops]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CURDStops);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
