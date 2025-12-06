import { PrismaService } from '@/lib/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async register(body: CreateUserDto) {
    try {
      const { name, email, password } = body;
      const isUser = await this.prisma.client.user.findFirst({
        where: {
          email,
        },
      });

      if (isUser) {
        throw new Error('User already exists');
      }

      const hashedPass = await bcrypt.hash(password, 10);

      await this.prisma.client.user.create({
        data: {
          name,
          email,
          password: hashedPass,
        },
      });

      return {
        message: 'user created successfully',
      };
    } catch (error) {
      throw error;
    }
  }
}
