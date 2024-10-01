import { Controller, Get, Param, ParseIntPipe,Post, Body, Delete, Put, UseGuards,Request } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/entities/user';
import { UserDto } from 'src/entities/user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';

@Controller('user')
export class UserController {


    constructor(public userService:UserService){}

    @Post()
    create(@Body() user: UserDto):Promise<User> {
        return this.userService.create(user);
    }//radi

    @Get()
    getAll(): Promise<User[]> {
        return this.userService.getAll();
    }//radi

    @Get(':id')
    getById(@Param('id', ParseIntPipe)id: number):Promise<User> {
        return this.userService.getById(id);
    }//radi

    @Get(':email')
    getByEmail(@Param('email')email: string):Promise<User> {
        return this.userService.getByEmail(email);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe)id: number):Promise<User> {
        return this.userService.delete(id);
    }//radi

    @Put(':id')
    update(@Param('id', ParseIntPipe)id: number, @Body() user: UserDto):Promise<User> {
        return this.userService.update(id, user);
    }//radi

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req:any) {
      return req.user;
    }
}
