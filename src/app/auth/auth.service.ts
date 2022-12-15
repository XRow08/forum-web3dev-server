import { UserService } from './../user/user.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DateTime } from 'luxon';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  login(user) {
    const token = this.jwtService.sign(user);
    const payload = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString(),
    );
    const expiresIn = DateTime.fromMillis(payload.exp * 1000)
      .toUTC()
      .toISO();
    console.log('payload 1', payload);
    return {
      token,
      expiresIn,
      user,
    };
  }

  async validate(username: string, password: string) {
    try {
      const user = await this.userService.findOneByUsername(username);
      const isValid = this.userService.validatePassword(
        password,
        user.password,
      );
      if (!isValid) throw new Error();
      delete user.password;
      return user;
    } catch (error) {
      throw new ForbiddenException('Username e/ou senha estão inválidos!');
    }
  }
}
