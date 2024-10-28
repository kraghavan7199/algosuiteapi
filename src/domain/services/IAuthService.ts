export interface IAuthService {
    register(name: string, email: string, password: string): any;
    login(email: string, password: string): any;
    verifyToken(token: string): any;
}