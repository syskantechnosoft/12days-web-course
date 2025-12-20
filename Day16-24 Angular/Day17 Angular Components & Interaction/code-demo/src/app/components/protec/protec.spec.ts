import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Protec } from './protec';

describe('Protec', () => {
  let component: Protec;
  let fixture: ComponentFixture<Protec>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Protec]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Protec);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
