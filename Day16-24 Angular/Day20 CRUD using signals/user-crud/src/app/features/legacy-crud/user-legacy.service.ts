import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../../core/models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserLegacyService {
    private http = inject(HttpClient);
    private apiUrl = 'https://jsonplaceholder.typicode.com/users';

    private usersSubject = new BehaviorSubject<User[]>([]);
    public users$ = this.usersSubject.asObservable();

    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    constructor() {
        this.loadUsers(); // Call loadUsers in the constructor to initialize from localStorage
    }

    public loadUsers(): void {
        this.loadingSubject.next(true);
        // Simulate Async
        setTimeout(() => {
            const users = JSON.parse(localStorage.getItem('users_legacy') || '[]');
            this.usersSubject.next(users);
            this.loadingSubject.next(false);
        }, 500);
    }

    addUser(user: User): Observable<User> {
        const newUser = { ...user, id: Math.floor(Math.random() * 100000) };
        const currentUsers = this.usersSubject.value;
        const updatedUsers = [...currentUsers, newUser];

        localStorage.setItem('users_legacy', JSON.stringify(updatedUsers));
        this.usersSubject.next(updatedUsers);

        return of(newUser);
    }

    updateUser(user: User): Observable<User> {
        const currentUsers = this.usersSubject.value;
        const updatedUsers = currentUsers.map(u => u.id === user.id ? user : u);

        localStorage.setItem('users_legacy', JSON.stringify(updatedUsers));
        this.usersSubject.next(updatedUsers);

        return of(user);
    }

    deleteUser(id: number): Observable<void> {
        const currentUsers = this.usersSubject.value;
        const updatedUsers = currentUsers.filter(u => u.id !== id);

        localStorage.setItem('users_legacy', JSON.stringify(updatedUsers));
        this.usersSubject.next(updatedUsers);

        return of(void 0);
    }

    getUserById(id: number): User | undefined {
        return this.usersSubject.value.find(u => u.id === id);
    }
}
