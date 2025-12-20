import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { jwtInterceptor } from './jwt.interceptor';
import { AuthService } from '../auth/auth.service';
import { signal } from '@angular/core';

describe('jwtInterceptor', () => {
    let httpTestingController: HttpTestingController;
    let httpClient: HttpClient;
    let authServiceMock: any;

    beforeEach(() => {
        authServiceMock = {
            currentUser: signal(null),
            isAuthenticated: signal(false),
            getToken: () => localStorage.getItem('token')
        };

        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(withInterceptors([jwtInterceptor])),
                provideHttpClientTesting(),
                { provide: AuthService, useValue: authServiceMock }
            ]
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        httpClient = TestBed.inject(HttpClient);

        // Mock token persistence behavior if any
        localStorage.clear();
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should add Authorization header if token exists', () => {
        localStorage.setItem('currentUser', JSON.stringify({ id: 1 }));
        // Mock token logic - usually AuthService handles this or interceptor reads
        // Assuming interceptor reads from AuthService or LocalStorage.
        // If the implementation reads from AuthService.currentUser(), we need to set it.

        // Let's verify implementation of jwt.interceptor.ts
        // "jwtInterceptor correctly injects AuthService and adds an Authorization header"
        // So we should set the signal.
        authServiceMock.currentUser.set({ id: 1, name: 'Test' });
        authServiceMock.isAuthenticated.set(true); // if using computed

        // But we actually mock the TOKEN in localStorage if that's what interceptor uses
        // OR if interceptor gets token from AuthService.getToken() mocking that would be best.
        // Assuming simple Bearer token logic from prev context.

        // Actually earlier summary said: "Uses Angular Signals (currentUser, isAuthenticated) and an effect to persist user data and token in localStorage."
        // And "jwtInterceptor ... attach a mock JWT token".
        // Let's assume it reads from localStorage 'token' key if not using authService.getToken().
        localStorage.setItem('token', 'mock-token');

        httpClient.get('/test').subscribe();

        const req = httpTestingController.expectOne('/test');
        expect(req.request.headers.has('Authorization')).toBeTruthy();
        expect(req.request.headers.get('Authorization')).toContain('Bearer');
        req.flush({});
    });

    it('should not add header if no token', () => {
        authServiceMock.currentUser.set(null);
        localStorage.removeItem('token');

        httpClient.get('/test').subscribe();

        const req = httpTestingController.expectOne('/test');
        expect(req.request.headers.has('Authorization')).toBeFalsy();
        req.flush({});
    });
});
