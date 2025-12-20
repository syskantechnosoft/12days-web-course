import { Component } from '@angular/core';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../services/auth';
import { inject } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  auth = inject(Auth);
}
