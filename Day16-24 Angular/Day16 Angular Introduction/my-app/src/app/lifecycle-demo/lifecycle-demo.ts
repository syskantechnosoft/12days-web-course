import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'lifecycle-demo',
  standalone: true,
  template: `
    <div style="background: #f0f0f0; padding: 10px; margin-top: 10px;">
      <h4>Lifecycle Monitor</h4>
      <p>Counter: {{ counter }}</p>
      <button (click)="incrementCounter()" style="padding: 5px 10px; margin-top: 10px;">
        Increment Child Counter
      </button>
    </div>
  `
})
export class LifecycleDemo implements OnInit, OnChanges, OnDestroy {
  @Input() counter: number = 0;

  constructor() {
    console.log('1. Constructor: Class instantiated, Inputs not available yet.');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('2. ngOnChanges: Input property changed', changes);
  }

  ngOnInit(): void {
    console.log('3. ngOnInit: Component initialized. Good place for API calls.');
  }

  ngOnDestroy(): void {
    console.log('4. ngOnDestroy: Component is being removed. Clean up timers/subscriptions here.');
  }

  incrementCounter(): void {
    this.counter++;
  }
}


