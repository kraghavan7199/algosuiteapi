export interface IAuthService {
    register(name: string, email: string, password: string, user_role: string): any;
    login(email: string, password: string, user_role: string): any;
    verifyToken(token: string): any;
}