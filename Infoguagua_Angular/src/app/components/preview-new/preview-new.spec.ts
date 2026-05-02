import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewNew } from './preview-new';

describe('PreviewNew', () => {
  let component: PreviewNew;
  let fixture: ComponentFixture<PreviewNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewNew],
    }).compileComponents();

    fixture = TestBed.createComponent(PreviewNew);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
