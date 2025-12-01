// client/src/app/app.component.ts

import { Component } from '@angular/core';
import { HeaderProductComponent } from './components/header-product.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [HeaderProductComponent],
    template: `
    <app-header-product></app-header-product>
  `,
})
export class App { }