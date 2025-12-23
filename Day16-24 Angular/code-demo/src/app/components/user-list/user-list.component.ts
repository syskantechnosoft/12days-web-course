import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { HighlightDirective } from '../../shared/directives/highlight.directive';
import { PhoneFormatPipe } from '../../shared/pipes/phone-format.pipe';

@Component({
    selector: 'app-user-list',
    standalone: true,
    imports: [CommonModule, HighlightDirective, PhoneFormatPipe],
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.css'
})
export class UserListComponent {
    userService = inject(UserService);

    users = this.userService.users;
    loading = this.userService.loading;
    error = this.userService.error;

    deleteUser(event: Event, id: number) {
        event.stopPropagation();
        if (confirm('Are you sure you want to delete this user?')) {
            this.userService.deleteUser(id);
        }
    }

    createNewUser() {
        this.userService.createUser({
            name: 'New User',
            username: 'newuser',
            email: 'test@test.com',
            address: {
                street: '123 Main St',
                suite: 'Apt 1',
                city: 'City',
                zipcode: '12345',
                geo: { lat: '0', lng: '0' }
            },
            phone: '123-456-7890',
            website: 'example.com',
            company: {
                name: 'New Co',
                catchPhrase: 'Innovation',
                bs: 'tech'
            }
        });
    }
}
