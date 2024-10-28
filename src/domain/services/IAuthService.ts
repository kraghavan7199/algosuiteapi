export interface IAuthService {
    register(email: string, password: string): any;
    login(email: string, password: string): any;
    verifyToken(token: string): any;
}