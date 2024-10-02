import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(name: string, password: string): Promise<any> {
    const user = await this.userService.findByName(name);
    user.toObject();
    if (user && (await bcrypt.compare(password, user.password))) {
      return {
        userId: user._id,
        name: user.name,
      };
    }

    return null;
  }
}
