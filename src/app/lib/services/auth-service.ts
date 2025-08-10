export interface LoginResponse {
  message: string;
  nim?: string;
}

export interface ConfirmResponse {
  message: string;
}

export interface AuthError {
  error: string;
}

export class AuthService {
  private static async handleResponse<T>(response: Response): Promise<T> {
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'An unexpected error occurred');
    }
    
    return data;
  }

  static async login(nim: string, password: string): Promise<LoginResponse> {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nim, password }),
    });

    return this.handleResponse<LoginResponse>(response);
  }

  static async adminLogin(nim: string, password: string): Promise<LoginResponse> {
    const response = await fetch('/api/auth/admin-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nim, password }),
    });

    return this.handleResponse<LoginResponse>(response);
  }

  static async confirmToken(nim: string, confirmToken: string, password: string): Promise<ConfirmResponse> {
    const response = await fetch('/api/auth/confirm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nim, confirmToken, password }),
    });

    return this.handleResponse<ConfirmResponse>(response);
  }

  static async logout(): Promise<void> {
    const response = await fetch('/api/auth/logout', {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }
  }

  static async checkAuthStatus(): Promise<{ isAuthenticated: boolean; nim?: string }> {
    try {
      const response = await fetch('/api/auth/status', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        return { isAuthenticated: true, nim: data.nim };
      }
      
      return { isAuthenticated: false };
    } catch (error) {
      return { isAuthenticated: false };
    }
  }
}
