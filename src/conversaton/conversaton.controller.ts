import { Controller } from '@nestjs/common';
import { ConversatonService } from './conversaton.service';

@Controller('conversaton')
export class ConversatonController {
  constructor(private readonly conversatonService: ConversatonService) {}
}
