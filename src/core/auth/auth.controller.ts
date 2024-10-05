import { Controller, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @Post('/login')
  async login(@Request() req, @Res({ passthrough: true }) res) {
    const accessToken = await this.authService.login(req.user);
    res.cookie('access_token', accessToken.accessToken, {
      httpOnly: true,
    });
    return {
      massage: 'Login successful',
    };
  }

  @Post('/logout')
  async logout(@Res({ passthrough: true }) res) {
    res.clearCookie('access_token');
    return {
      message: 'Logout successful',
    };
  }
}
