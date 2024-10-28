import { injectable, inject } from "inversify";
import { sign, verify } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';
import { IUserRepository } from "../IUserRepository";
dotenv.config();

@injectable()
export class AuthService {
    constructor(
        @inject('userRepo') private userRepository: IUserRepository
    ) {}

    async register(email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await this.userRepository.createUser(email, hashedPassword);
    }

    async login(email: string, password: string): Promise<string | null> {
        const user = await this.userRepository.getUserByEmail(email);
        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return null;  

        return sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "7d" });
    }

    verifyToken(token: string): any {
        try {
            return verify(token, process.env.JWT_SECRET!);
        } catch {
            return null;
        }
    }
}
