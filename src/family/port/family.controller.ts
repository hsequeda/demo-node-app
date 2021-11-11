import { v4 } from 'uuid';
import {
  Controller,
  Post,
  Patch,
  Delete,
  Body,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Get,
  UseGuards,
} from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { AddPersonCommand } from '../app/command/add-person';
import { AddPersonDto } from './dto/add-person.dto';
import { ChangePersonPersonalDataDto } from './dto/change-person-personal-data.dto';
import { ChangePersonPersonalDataCommand } from '../app/command/change-person-personal-data';
import { DeletePersonCommand as RemovePersonCommand } from '../app/command/delete-person';
import { AddChildToPersonDto } from './dto/add-child-to-person.dto';
import { AddChildToPersonCommand } from '../app/command/add-child-to-person';
import { RemoveChildFromPersonCommand } from '../app/command/remove-child-from-person';
import { OnePersonQuery } from '../app/queries/one-person';
import { AllPersonQuery } from '../app/queries/all-persons';
import { AuthGuard } from '@nestjs/passport';

@Controller('family')
export class FamilyController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @HttpCode(204)
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async addPerson(@Body() addPersonDto: AddPersonDto) {
    const okOrErr = await this.commandBus.execute(
      new AddPersonCommand(
        v4(),
        addPersonDto.name,
        addPersonDto.lastname,
        addPersonDto.gender,
        addPersonDto.married,
        addPersonDto.age,
      ),
    );

    if (okOrErr.isFailure) {
      const err = okOrErr.unwrap();
      throw new HttpException(err.name, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @HttpCode(204)
  @Patch()
  @UseGuards(AuthGuard('jwt'))
  async changePersonPersonalData(
    @Body() changePersonPersonalDataDto: ChangePersonPersonalDataDto,
  ) {
    const okOrErr = await this.commandBus.execute(
      new ChangePersonPersonalDataCommand(
        changePersonPersonalDataDto.personId,
        changePersonPersonalDataDto.name,
        changePersonPersonalDataDto.lastname,
        changePersonPersonalDataDto.gender,
        changePersonPersonalDataDto.married,
        changePersonPersonalDataDto.age,
      ),
    );

    if (okOrErr.isFailure) {
      const err = okOrErr.unwrap();
      throw new HttpException(err.name, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @HttpCode(204)
  @Delete(':personId')
  @UseGuards(AuthGuard('jwt'))
  async removePerson(@Param() personId: string) {
    const okOrErr = await this.commandBus.execute(
      new RemovePersonCommand(personId),
    );

    if (okOrErr.isFailure) {
      const err = okOrErr.unwrap();
      throw new HttpException(err.name, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @HttpCode(204)
  @Post('addChild')
  @UseGuards(AuthGuard('jwt'))
  async addChildToPerson(@Body() addChildToPersonDto: AddChildToPersonDto) {
    const okOrErr = await this.commandBus.execute(
      new AddChildToPersonCommand(
        v4(),
        addChildToPersonDto.childName,
        addChildToPersonDto.personId,
      ),
    );

    if (okOrErr.isFailure) {
      const err = okOrErr.unwrap();
      throw new HttpException(err.name, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @HttpCode(204)
  @Delete('removeChild/:personId/:childId')
  @UseGuards(AuthGuard('jwt'))
  async removeChildFromPerson(
    @Param() personId: string,
    @Param() childId: string,
  ) {
    const okOrErr = await this.commandBus.execute(
      new RemoveChildFromPersonCommand(personId, childId),
    );

    if (okOrErr.isFailure) {
      const err = okOrErr.unwrap();
      throw new HttpException(err.name, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @HttpCode(200)
  @Get(':personId')
  @UseGuards(AuthGuard('jwt'))
  async onePerson(@Param('personId') personId: string) {
    const person = this.queryBus.execute(new OnePersonQuery(personId));
    return person;
  }

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  async allPerson() {
    const persons = this.queryBus.execute(new AllPersonQuery());
    return persons;
  }
}
