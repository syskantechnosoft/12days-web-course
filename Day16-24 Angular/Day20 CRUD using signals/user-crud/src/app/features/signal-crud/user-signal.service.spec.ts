import { TestBed } from '@angular/core/testing';
import { UserSignalService } from './user-signal.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('UserSignalService', () => {
    let service: UserSignalService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                UserSignalService,
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        });
        service = TestBed.inject(UserSignalService);
        localStorage.clear();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should add user to localStorage', () => {
        const user: any = { id: 0, name: 'Test', username: 'test', email: 'test@test.com', role: 'user' };
        service.addUser(user);
        const stored = JSON.parse(localStorage.getItem('users_signal') || '[]');
        expect(stored.length).toBe(1);
        expect(service.users().length).toBe(1);
    });

    it('should delete user', () => {
        const user: any = { id: 1, name: 'Test', username: 'test', email: 'test@test.com', role: 'user' };
        localStorage.setItem('users_signal', JSON.stringify([user]));
        service.loadUsers();

        service.deleteUser(1);
        expect(service.users().length).toBe(0);
    });
});
