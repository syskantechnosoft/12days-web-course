import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserSignalService } from '../user-signal.service';
import { HighlightDirective } from '../../../shared/directives/highlight.directive';
import { RolePipe } from '../../../shared/pipes/role.pipe';

@Component({
  selector: 'app-user-list-signal',
  standalone: true,
  imports: [RouterLink, HighlightDirective, RolePipe],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListSignalComponent implements OnInit {
  public userService = inject(UserSignalService);

  ngOnInit() {
    this.userService.loadUsers();
  }

  deleteUser(id: number) {
    if (confirm('Are you sure?')) {
      this.userService.deleteUser(id);
    }
  }
}
