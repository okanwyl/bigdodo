import { Controller, Get } from '@nestjs/common';
import { Roles } from 'modules/roles/roles.decorator';
import { Role } from 'modules/roles/roles.enum';
@Controller()
export class AppController {
  @Get()
  // @Roles(Role.User)
  getHello(): string {
    return 'Hello World!';
  }
}
