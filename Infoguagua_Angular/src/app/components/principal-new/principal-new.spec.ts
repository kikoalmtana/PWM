import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalNew } from './principal-new';

describe('PrincipalNew', () => {
  let component: PrincipalNew;
  let fixture: ComponentFixture<PrincipalNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrincipalNew],
    }).compileComponents();

    fixture = TestBed.createComponent(PrincipalNew);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
