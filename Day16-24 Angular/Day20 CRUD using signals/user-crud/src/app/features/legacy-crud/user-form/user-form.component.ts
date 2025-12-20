import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserLegacyService } from '../user-legacy.service';

@Component({
    selector: 'app-user-form-legacy',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink, CommonModule],
    templateUrl: './user-form.component.html',
    styleUrl: './user-form.component.css'
})
export class UserFormLegacyComponent implements OnInit {
    private fb = inject(FormBuilder);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private userService = inject(UserLegacyService);

    userForm = this.fb.group({
        id: [0],
        name: ['', Validators.required],
        username: ['', [
            Validators.required,
            Validators.minLength(7),
            Validators.pattern('^[a-zA-Z0-9]+$')
        ]],
        email: ['', [
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$')
        ]],
        role: ['user']
    });

    isEditMode = false;

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEditMode = true;
            const user = this.userService.getUserById(+id);
            if (user) {
                this.userForm.patchValue(user as any);
            }
        }
    }

    onSubmit() {
        if (this.userForm.valid) {
            const formValue = this.userForm.value as any;
            if (this.isEditMode) {
                this.userService.updateUser(formValue).subscribe(() => {
                    this.router.navigate(['/legacy-crud']);
                });
            } else {
                this.userService.addUser(formValue).subscribe(() => {
                    this.router.navigate(['/legacy-crud']);
                });
            }
        }
    }
}
