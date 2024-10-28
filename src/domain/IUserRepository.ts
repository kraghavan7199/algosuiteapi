export interface IUserRepository {
    getUserByEmail(email: string):any;
    createUser(name: string, email: string, hashedPassword: string): any
    getUser(id: number): any;
}