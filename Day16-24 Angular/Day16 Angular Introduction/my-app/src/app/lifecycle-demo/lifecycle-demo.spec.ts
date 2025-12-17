import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifecycleDemo } from './lifecycle-demo';

describe('LifecycleDemo', () => {
  let component: LifecycleDemo;
  let fixture: ComponentFixture<LifecycleDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LifecycleDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LifecycleDemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
