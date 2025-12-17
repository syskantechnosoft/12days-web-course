import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile   implements OnInit {
  // name:string = 'Angular';
  // Properties
  userName: string = 'John Doe';
  userEmail: string = 'john@example.com';
  userAge: number = 28;
  isActive: boolean = true;
  profileImage: string = 'https://reqres.in/img/faces/7-image.jpg';
  
  // Computed property
  get statusText(): string {
    return this.isActive ? 'Active' : 'Inactive';
  }
  
  // Array
  skills: string[] = ['Angular', 'TypeScript', 'RxJS'];
  
  // Object
  address = {
    street: '123 Main St',
    city: 'New York',
    country: 'USA'
  };

  constructor() {
    console.log('UserProfileComponent constructor called');
  }

  ngOnInit(): void {
    console.log('UserProfileComponent initialized');
    this.loadUserData();
  }

  // Methods
  loadUserData(): void {
    // Simulate loading data
    console.log('Loading user data...');
  }

  updateProfile(): void {
    console.log('Profile updated for:', this.userName);
    alert(`Profile updated for ${this.userName}`);
  }

  toggleStatus(): void {
    this.isActive = !this.isActive;
  }

  addSkill(skill: string): void {
    if (skill && !this.skills.includes(skill)) {
      this.skills.push(skill);
    }
  }

}
