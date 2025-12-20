import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { ToastService } from '../../shared/services/toast.service';
import { provideRouter } from '@angular/router';

describe('AuthService', () => {
    let service: AuthService;
    let toastServiceSpy: any;

    beforeEach(() => {
        const spy = { show: (() => { }) };
        TestBed.configureTestingModule({
            providers: [
                AuthService,
                provideRouter([]),
                { provide: ToastService, useValue: spy }
            ]
        });
        service = TestBed.inject(AuthService);
        toastServiceSpy = TestBed.inject(ToastService);
        localStorage.clear();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should login admin successfully', () => {
        service.login('admin');
        expect(service.currentUser()?.role).toBe('admin');
    });

    it('should register successfully', () => {
        const newUser = { name: 'Test', username: 'testuser', email: 'test@test.com' };
        service.register(newUser);
        expect(service.currentUser()?.username).toBe('testuser');
        expect(localStorage.getItem('registered_users')).toContain('testuser');
    });

    it('should logout', () => {
        service.login('admin');
        service.logout();
        expect(service.currentUser()).toBeNull();
    });
});
