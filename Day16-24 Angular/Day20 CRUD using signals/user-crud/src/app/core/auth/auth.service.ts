import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { ToastService } from '../../shared/services/toast.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private router = inject(Router);
    private toastService = inject(ToastService);

    // Signal to hold the current user
    currentUser = signal<User | null>(this.getUserFromStorage());

    // Computed signal to check if user is authenticated
    isAuthenticated = computed(() => !!this.currentUser());

    constructor() {
        // Effect to persist user to local storage whenever it changes
        effect(() => {
            const user = this.currentUser();
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('token', 'mock-jwt-token-' + user.id);
            } else {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('token');
            }
        });
    }

    login(username: string): boolean {
        const storedUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
        const foundUser = storedUsers.find((u: User) => u.username === username);

        let userToLogin: User;

        if (foundUser) {
            userToLogin = foundUser;
        } else if (username === 'admin') {
            // Default Admin
            userToLogin = {
                id: 1,
                name: 'Admin User',
                username: 'admin',
                email: 'admin@example.com',
                role: 'admin'
            };
        } else {
            // Fallback for demo if no registration needed
            userToLogin = {
                id: Math.floor(Math.random() * 1000),
                name: 'Test ' + username,
                username: username,
                email: `${username}@test.com`,
                role: 'user'
            };
        }

        this.currentUser.set(userToLogin);
        this.toastService.show('Login Successful', 'success');
        this.router.navigate(['/signal-crud']);
        return true;
    }

    register(user: Partial<User>): boolean {
        const newUser: User = {
            id: Math.floor(Math.random() * 100000),
            name: user.name || 'User',
            username: user.username!,
            email: user.email!,
            role: 'user', // Default role
            ...user
        } as User;

        // Persist to "DB"
        const storedUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
        storedUsers.push(newUser);
        localStorage.setItem('registered_users', JSON.stringify(storedUsers));

        this.currentUser.set(newUser);
        this.toastService.show('Registration Successful', 'success');
        this.router.navigate(['/signal-crud']);
        return true;
    }

    socialLogin(provider: string) {
        // Mock social login
        const mockUser: User = {
            id: Math.floor(Math.random() * 1000),
            name: `Social User (${provider})`,
            username: `social_${provider}`,
            email: `user@${provider}.com`,
            role: 'user'
        };
        this.currentUser.set(mockUser);
        this.toastService.show(`Login with ${provider} Successful`, 'success');
        this.router.navigate(['/signal-crud']);
    }

    logout() {
        this.currentUser.set(null);
        this.toastService.show('Logged out', 'info');
        this.router.navigate(['/login']);
    }

    private getUserFromStorage(): User | null {
        const userJson = localStorage.getItem('currentUser');
        return userJson ? JSON.parse(userJson) : null;
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }
}
