import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonRepository } from './adapter/person.repository';
import { PersonEntity } from './adapter/person.entity';
import { ChildEntity } from './adapter/child.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { FamilyController } from './port/family.controller';
import { AddPersonHandler } from './app/command/add-person';
import { AddChildToPersonHandler } from './app/command/add-child-to-person';
import { ChangePersonPersonalDataHandler } from './app/command/change-person-personal-data';
import { DeletePersonHandler } from './app/command/delete-person';
import { RemoveChildFromPersonHandler } from './app/command/remove-child-from-person';
import { AllPersonHandler } from './app/queries/all-persons';
import { OnePersonHandler } from './app/queries/one-person';
import { AccessModule } from 'src/access/access.module';

export const CommandHandlers = [
  AddPersonHandler,
  AddChildToPersonHandler,
  ChangePersonPersonalDataHandler,
  DeletePersonHandler,
  RemoveChildFromPersonHandler,
];
export const QueryHandlers = [AllPersonHandler, OnePersonHandler];

@Module({
  imports: [
    CqrsModule,
    AccessModule,
    TypeOrmModule.forFeature([PersonEntity, ChildEntity]),
  ],
  providers: [
    PersonRepository,
    { provide: 'IPersonRepository', useClass: PersonRepository },
    { provide: 'IAllPersonReadModel', useClass: PersonRepository },
    { provide: 'IOnePersonReadModel', useClass: PersonRepository },
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  controllers: [FamilyController],
})
export class FamilyModule {}
