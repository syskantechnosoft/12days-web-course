import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private http = inject(HttpClient);
    private apiUrl = 'https://jsonplaceholder.typicode.com/users';

    // Signals
    users = signal<User[]>([]);
    loading = signal<boolean>(false);
    error = signal<string | null>(null);

    constructor() {
        this.loadUsers();
    }

    loadUsers() {
        this.loading.set(true);
        this.http.get<User[]>(this.apiUrl).subscribe({
            next: (data) => {
                this.users.set(data);
                this.loading.set(false);
            },
            error: (err) => {
                this.error.set(err.message);
                this.loading.set(false);
            }
        });
    }

    deleteUser(id: number) {
        this.users.update(users => users.filter(u => u.id !== id));
    }

    createUser(user: Omit<User, 'id'>) {
        // Simulate creation
        const newUser = { ...user, id: Math.floor(Math.random() * 10000) + 11 };
        this.users.update(users => [newUser, ...users]);
    }
}
