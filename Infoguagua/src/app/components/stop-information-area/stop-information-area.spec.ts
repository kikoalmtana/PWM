import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopInformationArea } from './stop-information-area';

describe('StopInformationArea', () => {
  let component: StopInformationArea;
  let fixture: ComponentFixture<StopInformationArea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StopInformationArea],
    }).compileComponents();

    fixture = TestBed.createComponent(StopInformationArea);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
