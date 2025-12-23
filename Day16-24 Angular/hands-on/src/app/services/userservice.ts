import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class Userservice {

  users: User[] = [];
  private http = inject(HttpClient);
  private apiUrl = 'https://jsonplaceholder.typicode.com';

  private mockUsers: User[] = [
    { id: 1, name: "Leanne Graham", username: "Bret", email: "Sincere@april.biz", phone: "1-770-736-8031", website: "hildegard.org" },
    { id: 2, name: "Ervin Howell", username: "Antonette", email: "Shanna@melissa.tv", phone: "010-692-6593", website: "anastasia.net" },
    { id: 3, name: "Clementine Bauch", username: "Samantha", email: "Nathan@yesenia.net", phone: "1-463-123-4447", website: "ramiro.info" }
  ];

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`)
      .pipe(
        catchError((error) => {
          console.warn('API failed, using mock data:', error.message);
          this.users = this.mockUsers;
          return of(this.mockUsers);
        })
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}

