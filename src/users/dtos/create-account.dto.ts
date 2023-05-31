import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class CreateAccountInput {
  @Field((type) => String)
  @IsEmail()
  email: string;
  @Field((type) => String)
  @IsString()
  password: string;
  @Field((type) => String)
  @IsString()
  nickname: string;
}

@ObjectType()
export class CreateAccountOutput extends CoreOutput {}
