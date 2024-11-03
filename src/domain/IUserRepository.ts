export interface IUserRepository {
    getUserByEmail(email: string, user_role: string):any;
    createUser(name: string, email: string, hashedPassword: string, user_role: string): any
    getUser(id: number): any;
    getUserData(): any;
    getAllUsers(payload: any): any;
    changeUserBlockStatus(userId: number, isBlocked: boolean): any;
}