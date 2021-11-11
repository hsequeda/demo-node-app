import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { LoggedIn } from './dto/logged-in.dto';
import { v4 } from 'uuid';
import { genSalt, hash, compare } from 'bcryptjs';

@Controller('access')
export class AccessController {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>,
    private readonly _jwtService: JwtService,
  ) {}

  @Post('/signup')
  async signup(@Body() signupDto: SignupDto): Promise<LoggedIn> {
    const salt = await genSalt(12);
    const password = await hash(signupDto.password, salt);
    const id = v4();
    await this._userRepository.save({
      id: id,
      password: password,
    });

    return {
      userId: id,
      token: this._jwtService.sign({ userId: id }),
    };
  }

  @Post('/signin')
  async signin(@Body() signinDto: SigninDto): Promise<LoggedIn> {
    const user = await this._userRepository.findOne(signinDto.userId);
    const isMatch = await compare(signinDto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('invalid credentials');
    }

    return {
      userId: user.id,
      token: this._jwtService.sign({ userId: user.id }),
    };
  }
}
