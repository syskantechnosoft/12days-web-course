import { Component } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    template: `
    <div class="card">
      <h3>Dashboard</h3>
      <p>Welcome to the User Management System.</p>
      <p>Select a CRUD implementation from the sidebar to get started.</p>
    </div>
  `
})
export class DashboardComponent { }
