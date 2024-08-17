import { Controller, Delete, Get, Post, Put, Request } from '@nestjs/common';
import { AppService, deleteResult, updateDetails, updateResult } from './app.service';
import { AuthService, UserDetails } from './auth/auth.service';

type accessToken = {
  accessToken: string
}

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('postuser')
  async postUserDetails(@Request() req: Request): Promise<accessToken> {
    const user: UserDetails = {
      username: req.body["username"],
      password: req.body["password"]
    }
    await this.appService.createUser(user);
    return {
      accessToken: this.authService.generateAccessToken(user.username, user.password)
    }
  }

  @Get('getuser')
  getUserDetails(@Request() req: Request) {
    const token: accessToken = {
      accessToken: req.body["accessToken"]
    }
    return this.appService.getUser(token.accessToken);
  }

  @Put('updateuser')
  async updateUserdetails(@Request() req: Request): Promise<updateResult> {
    const token: string = req.body["accessToken"];
    const field: updateDetails = {
      username: req.body["username"],
      password: req.body["password"]
    }
    return await this.appService.updateUser(token, field);
  }

  @Delete('deleteuser')
  async deletUserDetails(@Request() req: Request): Promise<deleteResult> {
    const token: string = req.body["accessToken"];
    return await this.appService.deleteUser(token);
  }
 }
