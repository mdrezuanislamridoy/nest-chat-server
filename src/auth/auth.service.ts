import bcrypt from 'bcrypt';
import { PrismaService } from '@/lib/prisma/prisma.service';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-dto';
import { User } from '@prisma';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(body: LoginUserDto) {
    const { email, password } = body;

    const user = await this.prisma.client.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPassValid = await bcrypt.compare(password, user.password);

    if (!isPassValid) {
      throw new ForbiddenException('Invalid password');
    }

    const token = this.generateToken(user);
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  generateToken(user: User) {
    return this.jwtService.sign(
      {
        sub: user.id,
        email: user.email,
      },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '1d',
      },
    );
  }
}
