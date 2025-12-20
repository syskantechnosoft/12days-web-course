import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListSignalComponent } from './user-list.component';
import { UserSignalService } from '../user-signal.service';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';

describe('UserListSignalComponent', () => {
    let component: UserListSignalComponent;
    let fixture: ComponentFixture<UserListSignalComponent>;

    beforeEach(async () => {
        const userServiceMock = {
            users: signal([]),
            totalUsers: signal(0),
            loadUsers: () => { },
            deleteUser: () => { }
        };

        await TestBed.configureTestingModule({
            imports: [UserListSignalComponent],
            providers: [
                provideRouter([]),
                { provide: UserSignalService, useValue: userServiceMock }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(UserListSignalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
