import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app';
import { AuthService } from './core/auth/auth.service';
import { provideRouter } from '@angular/router';

describe('AppComponent', () => {
  beforeEach(async () => {
    // Mock AuthService
    const authServiceMock = {
      logout: () => { },
      isAuthenticated: () => false // signal
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authServiceMock }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
