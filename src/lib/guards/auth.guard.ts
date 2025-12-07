import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const auth = context.switchToHttp().getRequest().headers.authorization;

    if (!auth) throw new UnauthorizedException('No token');

    const token = auth.startsWith('Bearer ') ? auth.split(' ')[1] : auth;

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    if (!decoded) throw new UnauthorizedException('Invalid token');

    context.switchToHttp().getRequest().user = decoded;

    return true;
  }
}
