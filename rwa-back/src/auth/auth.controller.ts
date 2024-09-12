import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UserDto } from 'src/entities/user.dto';
import { AuthSignInUserDto } from './dtos/auth-sign-in-dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('signup')
    signUp(@Body() signUpDto: UserDto) {
        return this.authService.signUp(signUpDto);
    }//radi

    @Post('signin')
    signIn(@Body() signInDto: AuthSignInUserDto) {
        return this.authService.signIn(signInDto);
    }//radi

    @Get('guardtest')
    getUser(@Req() req : Request) {
        return req.body;
    }
}
