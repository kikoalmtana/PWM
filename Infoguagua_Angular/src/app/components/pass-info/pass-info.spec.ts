import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassInfo } from './pass-info';

describe('PassInfo', () => {
  let component: PassInfo;
  let fixture: ComponentFixture<PassInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
