# Code Demo - Angular User Management

A professional User Management application built with **Angular v19+** showcasing modern architectural patterns and best practices. This project demonstrates CRUD operations, reactive state management, and a polished dark-mode UI.

![Angular](https://img.shields.io/badge/Angular-19.0.0-dd0031.svg?style=flat&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue.svg?style=flat&logo=typescript)

## 🚀 Features

- **Modern Angular**: Built with **Standalone Components**, removing the need for NgModules.
- **Reactive State**: Utilizes **Signals** (`signal`, `computed`, `effect`) for granular and efficient change detection.
- **Dependency Injection**: Uses the modern function-based `inject()` API.
- **Custom Artifacts**:
  - **Directive**: `[appHighlight]` for interactive row highlighting.
  - **Pipe**: `phoneFormat` for standardizing phone number display.
- **Styling**: Professional "Dark Mode" aesthetic using **CSS Variables** and native CSS nesting.
- **API Integration**: Fetches data from `JSONPlaceholder` using `HttpClient` with `fetch` API support.

## 📂 Project Structure

```
src/
├── app/
│   ├── components/         # Feature components
│   │   └── user-list/      # User listing, creation, and deletion logic
│   ├── models/             # TypeScript interfaces (User, Address, Company)
│   ├── services/           # Data services (UserService)
│   ├── shared/             # Reusable artifacts
│   │   ├── directives/     # Directives (HighlightDirective)
│   │   └── pipes/          # Pipes (PhoneFormatPipe)
│   ├── app.routes.ts       # Application routing configuration
│   └── app.config.ts       # Global app config (HttpClient, Router)
└── styles.css              # Global design system & CSS variables
```

## 📍 Application Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Redirect` | Automatically redirects to `/users`. |
| `/users` | `UserListComponent` | The main dashboard. Displays the table of users, handles loading states, error display, and actions (Add/Delete). |

### Route Functionality Details

#### **`/users` (User Dashboard)**
- **View Users**: Fetches and displays a list of users from the API on load.
- **Create User**: Clicking **"+ Add User"** simulates adding a new user to the top of the list (optimistic UI update).
- **Delete User**: Clicking **"Delete"** triggers a confirmation dialog and removes the user from the local state.
- **Interactions**:
  - Rows highlight on hover using `HighlightDirective`.
  - Phone numbers are formatted for readability using `PhoneFormatPipe`.

## 🛠️ Technical Implementation

### **State Management (UserService)**
The `UserService` uses Signals to manage state, avoiding `BehaviorSubject` boilerplate:
```typescript
// State
users = signal<User[]>([]);
loading = signal<boolean>(false);
error = signal<string | null>(null);

// Updating State
this.users.update(current => [...current, newUser]);
```

### **Styling**
The application uses a semantic CSS variable system defined in `styles.css`:
- `--primary`: Indigo (#6366f1)
- `--bg-dark`: Slate (#0f172a)
- `--text-main`: Slate (#f8fafc)

## 🏃‍♂️ Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run Development Server**
    ```bash
    npm start
    # Application will open at http://localhost:4200
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```
