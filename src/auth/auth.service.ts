import { Injectable, Request } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


export type UserDetails = {
    username: string,
    password: string
}

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService){}

    generateAccessToken(username: string, password: string): string {
        const payload: UserDetails = {
            username: username,
            password: password
        }
        return this.jwtService.sign(payload)
    }

    verifyAccessToken(token: string): any{
        try {
            const result = this.jwtService.verify(token)
            return {
                ...result
            }
        } catch(e) {
            console.error("Not a valid Token");
            return {
                username: "Invalid Token"
            }
        }
    }
}