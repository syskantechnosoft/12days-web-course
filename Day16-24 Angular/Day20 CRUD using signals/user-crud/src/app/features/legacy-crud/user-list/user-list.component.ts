import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // AsyncPipe
import { RouterLink } from '@angular/router';
import { UserLegacyService } from '../user-legacy.service';
import { RolePipe } from '../../../shared/pipes/role.pipe';
import { HighlightDirective } from '../../../shared/directives/highlight.directive';

@Component({
  selector: 'app-user-list-legacy',
  standalone: true,
  imports: [CommonModule, RouterLink, RolePipe, HighlightDirective],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListLegacyComponent implements OnInit {
  public userService = inject(UserLegacyService);
  public users$ = this.userService.users$;

  ngOnInit() {
    this.userService.loadUsers();
  }

  deleteUser(id: number) {
    if (confirm('Are you sure?')) {
      this.userService.deleteUser(id).subscribe();
    }
  }
}
