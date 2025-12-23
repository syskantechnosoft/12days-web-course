// import { Component, inject, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Userservice } from '../../services/userservice';
// import { User } from '../../models/user.model';

// @Component({
//   selector: 'app-user-detail',
//   imports: [CommonModule],
//   templateUrl: './user-detail.html',
//   styleUrl: './user-detail.css',
// })
// export class UserDetail implements OnInit {

//   private userService = inject(Userservice);
//   users: User[] = [];

//   ngOnInit(): void {
//     this.userService.getUsers().subscribe((users: User[]) => {
//       this.users = users;
//       console.log('this.users:', this.users, 'users:', users);
//     });
//   }

// }


import { Component, effect, inject } from '@angular/core';
import { UserService } from '../../services/userservice1';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-detail',
  imports: [CommonModule],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css',
})
export class UserDetail {
  userService = inject(UserService);
  users: User[] = [];

  constructor() {
    // Load users once
    this.users = this.userService.users();

    // Optional: reactively log whenever users change
    effect(() => {
      console.log('Users updated:', this.userService.users());
    });
  }
}