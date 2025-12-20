import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFormSignalComponent } from './user-form.component';
import { UserSignalService } from '../user-signal.service';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

describe('UserFormSignalComponent', () => {
    let component: UserFormSignalComponent;
    let fixture: ComponentFixture<UserFormSignalComponent>;

    beforeEach(async () => {
        const userServiceMock = {
            users: signal([]),
            addUser: () => { },
            updateUser: () => { }
        };

        await TestBed.configureTestingModule({
            imports: [UserFormSignalComponent, FormsModule],
            providers: [
                provideRouter([]),
                { provide: UserSignalService, useValue: userServiceMock }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(UserFormSignalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
