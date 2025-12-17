import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


export interface MenuItem {
  label: string;
  route?: string;
  action?: () => void;
  icon?: string;
  children?: MenuItem[];
}

export interface UserInfo {
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}
@Component({
  selector: 'app-header',
  imports: [CommonModule, FormsModule],
  templateUrl: './app-header.html',
  styleUrl: './app-header.css',
})
export class AppHeader implements OnInit {

  // Input properties - configured by parent component
  @Input() title: string = 'My Application';
  @Input() logo?: string;
  @Input() menuItems: MenuItem[] = [];
  @Input() userInfo?: UserInfo;
  @Input() showSearch: boolean = true;
  @Input() theme: 'light' | 'dark' = 'light';

   // Output events - communicate with parent
  @Output() logoClick = new EventEmitter<void>();
  @Output() menuItemClick = new EventEmitter<MenuItem>();
  @Output() searchQuery = new EventEmitter<string>();
  @Output() userMenuClick = new EventEmitter<string>();
  @Output() themeToggle = new EventEmitter<'light' | 'dark'>();
  

   // Component state
  isMenuOpen: boolean = false;
  isUserMenuOpen: boolean = false;
  searchValue: string = '';
  activeMenuItem: string = '';


  constructor() {
    console.log('HeaderComponent: Constructor called');
  }

  ngOnInit(): void {
    console.log('HeaderComponent: Initialized with:', {
      title: this.title,
      menuItems: this.menuItems.length,
      userInfo: this.userInfo,
      theme: this.theme
    });
  }


  // Handle logo click
  onLogoClick(): void {
    console.log('Logo clicked');
    this.logoClick.emit();
  }

  // Handle menu item click
  onMenuItemClick(item: MenuItem): void {
    console.log('Menu item clicked:', item.label);
    this.activeMenuItem = item.label;
    this.isMenuOpen = false;
    
    if (item.action) {
      item.action();
    }
    
    this.menuItemClick.emit(item);
  }

  // Toggle mobile menu
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      this.isUserMenuOpen = false;
    }
  }

  // Toggle user menu
  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
    if (this.isUserMenuOpen) {
      this.isMenuOpen = false;
    }
  }

  // Handle search
  onSearch(): void {
    if (this.searchValue.trim()) {
      console.log('Searching for:', this.searchValue);
      this.searchQuery.emit(this.searchValue);
    }
  }

  // Handle search input
  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchValue = target.value;
  }

  // Clear search
  clearSearch(): void {
    this.searchValue = '';
    this.searchQuery.emit('');
  }

  // Handle user menu actions
  onUserMenuAction(action: string): void {
    console.log('User menu action:', action);
    this.isUserMenuOpen = false;
    this.userMenuClick.emit(action);
  }

  // Toggle theme
  onThemeToggle(): void {
    const newTheme = this.theme === 'light' ? 'dark' : 'light';
    this.theme = newTheme;
    this.themeToggle.emit(newTheme);
  }

  // Get user initials for avatar
  getUserInitials(): string {
    if (!this.userInfo) return '';
    return this.userInfo.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

}
