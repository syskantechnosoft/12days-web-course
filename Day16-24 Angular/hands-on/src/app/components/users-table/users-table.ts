import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-users-table',
  imports: [MatTableModule],
  templateUrl: './users-table.html',
  styleUrl: './users-table.css',
})
export class UsersTable {
  displayedColumns: string[] = ['id', 'name', 'username', 'email'];
  users: User[] = [
    { id: 1, name: "Leanne Graham", username: "Bret", email: "Sincere@april.biz", phone: "1-770-736-8031", website: "hildegard.org" },
    { id: 2, name: "Ervin Howell", username: "Antonette", email: "Shanna@melissa.tv", phone: "010-692-6593", website: "anastasia.net" },
    { id: 3, name: "Clementine Bauch", username: "Samantha", email: "Nathan@yesenia.net", phone: "1-463-123-4447", website: "ramiro.info" }
  ];

}
