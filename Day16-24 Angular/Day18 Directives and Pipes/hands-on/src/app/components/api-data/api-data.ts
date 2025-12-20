import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Api } from '../../services/api';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-api-data',
  imports: [],
  templateUrl: './api-data.html',
  styleUrl: './api-data.css',
})
export class ApiData {
  private api = inject(Api);
  posts = toSignal(this.api.getPosts(), { initialValue: [] });
}
