export interface IUserRepository {
    getUserByEmail(email: string):any;
    createUser(email: string, hashedPassword: string): any
    getUser(id: number): any;
}