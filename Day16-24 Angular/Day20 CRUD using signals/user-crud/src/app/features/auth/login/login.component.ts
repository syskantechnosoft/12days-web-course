import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    authService = inject(AuthService);
    router = inject(Router);

    username = '';
    password = '';

    errorMsg = '';

    onLogin() {
        if (this.username && this.password) {
            this.authService.login(this.username);
        } else {
            this.errorMsg = 'Please enter username and password';
        }
    }

    onSocialLogin(provider: string) {
        this.authService.socialLogin(provider);
    }
}
