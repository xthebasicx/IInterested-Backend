import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(name: string, password: string): Promise<any> {
    const user = await this.userService.findByName(name);
    if (user && (await bcrypt.compare(password, user.password))) {
      return {
        userId: user._id,
        name: user.name,
      };
    }

    return null;
  }

  async login(user: any) {
    const payload = { name: user.name, sub: user.userId };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
