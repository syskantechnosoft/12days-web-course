import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../core/models/user.model';
import { tap } from 'rxjs';

@Injectable({
    providedIn: 'root' // or provided in the feature module if we had one
})
export class UserSignalService {
    private http = inject(HttpClient);
    private apiUrl = 'https://jsonplaceholder.typicode.com/users';

    // Signals
    private usersSignal = signal<User[]>([]);
    readonly users = this.usersSignal.asReadonly();

    readonly totalUsers = computed(() => this.users().length);

    loadUsers() {
        // Load from localStorage instead of http mock
        const users = JSON.parse(localStorage.getItem('users_signal') || '[]');
        this.usersSignal.set(users);
    }

    addUser(user: User) {
        const newUser = { ...user, id: Math.floor(Math.random() * 100000) };
        this.usersSignal.update(users => {
            const updated = [...users, newUser];
            localStorage.setItem('users_signal', JSON.stringify(updated));
            return updated;
        });
    }

    updateUser(user: User) {
        this.usersSignal.update(users => {
            const updated = users.map(u => u.id === user.id ? user : u);
            localStorage.setItem('users_signal', JSON.stringify(updated));
            return updated;
        });
    }

    deleteUser(id: number) {
        this.usersSignal.update(users => {
            const updated = users.filter(u => u.id !== id);
            localStorage.setItem('users_signal', JSON.stringify(updated));
            return updated;
        });
    }
}
