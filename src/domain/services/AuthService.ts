import { injectable, inject } from "inversify";
import { sign, verify } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';
import { IUserRepository } from "../IUserRepository";
import { IAuthService } from "./IAuthService";
dotenv.config();

@injectable()
export class AuthService implements IAuthService {
    constructor(
        @inject('userRepo') private userRepository: IUserRepository
    ) {}

    async register(name: string, email: string, password: string, user_role: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await this.userRepository.createUser(name, email, hashedPassword, user_role);
        if(result && result) {
            return sign({ userId: result.userId, role: user_role }, process.env.JWT_SECRET!, { expiresIn: "7d" });
        }
    }

    async login(email: string, password: string, user_role: string): Promise<string | null> {
        const user = await this.userRepository.getUserByEmail(email, user_role);
        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return null;  

        return sign({ userId: user.id, role: user.user_role }, process.env.JWT_SECRET!, { expiresIn: "7d" });
    }

    verifyToken(token: string): any {
        try {
            return verify(token, process.env.JWT_SECRET!);
        } catch {
            return null;
        }
    }
}
