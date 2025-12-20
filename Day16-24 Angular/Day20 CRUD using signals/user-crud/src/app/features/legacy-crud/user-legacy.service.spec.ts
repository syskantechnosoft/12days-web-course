import { TestBed } from '@angular/core/testing';
import { UserLegacyService } from './user-legacy.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('UserLegacyService', () => {
    let service: UserLegacyService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                UserLegacyService,
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        });
        service = TestBed.inject(UserLegacyService);
        localStorage.clear();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should add user to localStorage via Observable', () => {
        const user: any = { id: 0, name: 'Test', username: 'test', email: 'test@test.com', role: 'user' };
        service.addUser(user).subscribe(added => {
            expect(added.name).toBe('Test');
            const stored = JSON.parse(localStorage.getItem('users_legacy') || '[]');
            expect(stored.length).toBe(1);
        });
    });
});
