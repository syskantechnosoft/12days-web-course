import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserSignalService } from '../user-signal.service';
import { User } from '../../../core/models/user.model';

@Component({
    selector: 'app-user-form-signal',
    standalone: true,
    imports: [FormsModule, RouterLink], // Template Driven
    templateUrl: './user-form.component.html',
    styleUrl: './user-form.component.css'
})
export class UserFormSignalComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    public userService = inject(UserSignalService); // Make public for template binding if needed, or use getter

    user: User = {
        id: 0,
        name: '',
        username: '',
        email: '',
        role: 'user'
    };
    isEditMode = false;

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEditMode = true;
            const existingUser = this.userService.users().find(u => u.id === +id);
            if (existingUser) {
                this.user = { ...existingUser };
            }
        }
    }

    onSubmit() {
        if (this.isEditMode) {
            this.userService.updateUser(this.user);
        } else {
            this.userService.addUser(this.user);
        }
        this.router.navigate(['/signal-crud']);
    }
}
