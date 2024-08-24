import { Injectable, Request } from '@nestjs/common';
import { databaseManager } from './utils/database';
import { Users } from './models/models';
import { AuthService, UserDetails } from './auth/auth.service';

export type updateDetails = {
  username?: string,
  password?: string
}

export type updateResult = {
  result: boolean,
  accessToken?: string
}

export type deleteResult = {
  result: boolean
}

@Injectable()
export class AppService {
  constructor(private authService: AuthService){}

  getHello(): string {
    return 'This is a Nest API';
  }

  async createUser(userdetails: UserDetails): Promise<void> {
    const user = new Users();
    user.username = userdetails.username;
    user.password = userdetails.password;
    await databaseManager.getRepository<Users>(Users).save(user);
  }

  getUser(token: string): any {
    return this.authService.verifyAccessToken(token);
  }

  async updateUser(token: string, field: updateDetails): Promise<updateResult> {
    const details = this.authService.verifyAccessToken(token);
    if(details.username === "Invalid Token") {
      return {
        result: false
      }
    }
    else {
      const user = await databaseManager.getRepository<Users>(Users).findOne({where: {
        username: details.username
      }});
      const id: number = user.id;
      await databaseManager.getRepository<Users>(Users).save({
        ...user,
        ...field
      });
      const updatedUser = await databaseManager.getRepository<Users>(Users).findOne({where: {
        id: id
      }});
      return {
        result: true,
        accessToken: this.authService.generateAccessToken(updatedUser.username, updatedUser.password)
      }
    }
  }

  async deleteUser(token: string): Promise<deleteResult> {
    const details = this.authService.verifyAccessToken(token);
    if(details.username === "Invalid Token") {
        return {
          result: false
      }
    } else {
      const id: Users = await databaseManager.getRepository<Users>(Users).findOne({where:{username: details.username}});
      await databaseManager.getRepository<Users>(Users).delete(id.id);
      return {
        result: true
      }
    }
  }
}
