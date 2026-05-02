import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRUDPass } from './crud-pass';

describe('CRUDPass', () => {
  let component: CRUDPass;
  let fixture: ComponentFixture<CRUDPass>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CRUDPass]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CRUDPass);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
