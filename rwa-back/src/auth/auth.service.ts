import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserDto } from 'src/entities/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthSignInUserDto } from './dtos/auth-sign-in-dto';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {

    constructor(private userService:UserService, private jwtService: JwtService){}

    async validateUser(email: string, id: number): Promise<any> {
        const user = await this.userService.getByEmail(email);
        if (user && user.id === id) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async signUp(signUpDto: UserDto): Promise<any> {

        let user = await this.userService.getByEmail(signUpDto.email);
        if (user == null) {
            user= await this.userService.create(signUpDto);
            return this.signToken(user.id, user.email);
        }
        else {
            throw new NotFoundException();
        }    
    }

    async signIn(signInDto: AuthSignInUserDto): Promise<any> {
        const user = await this.userService.getByEmail(signInDto.email);
        if(user == null) {
            throw new NotFoundException();
        }
        // console.log(signInDto);
        // console.log(user.password);
        // console.log(signInDto.password);
        const isPasswordValid = signInDto.password === user.password;
        if (!isPasswordValid) {
            throw new UnauthorizedException();
        }
        return this.signToken(user.id, user.email);
    }

    async signToken(id: number, email: string): Promise<{access_token : string}> {
        const payload = { email: email, sub: id };
        const token = await this.jwtService.signAsync(payload, { expiresIn: '1h', secret: jwtConstants.secret });
        return {
            access_token: token
        };
    }
}
