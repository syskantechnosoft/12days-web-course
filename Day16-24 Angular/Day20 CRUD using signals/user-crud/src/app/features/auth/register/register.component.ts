import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink, CommonModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);

    registerForm = this.fb.group({
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
        password: ['', Validators.required]
    });

    onSubmit() {
        if (this.registerForm.valid) {
            const formValue = this.registerForm.value;
            // Filter out nulls/undefineds roughly or just cast if confident
            const user = {
                name: formValue.name || '',
                username: formValue.username || '',
                email: formValue.email || '',
                password: formValue.password || ''
            };
            this.authService.register(user);
        }
    }
}
