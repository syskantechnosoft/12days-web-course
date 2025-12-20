import { Component, inject, OnInit,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit {
  users: User[] = [];

  private userService = inject(UserService);

  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (data) => { this.users = data; console.log('data:', data); this.cdr.markForCheck();},
      error: (err) => { console.log('error:', err); }
    });
  }



}
