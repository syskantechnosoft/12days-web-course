// user.service.ts
import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';
  //private apiUrl = 'https://cors-anywhere.herokuapp.com/https://reqres.in/api/users?page=1';

  // Signal to hold users
  users = signal<User[]>([]);

  loadUsers() {
    this.http.get<any>(this.apiUrl).subscribe(response => {
      this.users.set(response.data);  // ✅ update signal
    });
  }
}
