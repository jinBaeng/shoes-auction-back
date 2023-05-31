import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';

@InputType()
export class LoginInput {
  @Field((type) => String)
  @IsEmail()
  email: string;
  @Field((type) => String)
  @IsString()
  password: string;
}

@ObjectType()
export class LoginOutput extends CoreOutput {
  @Field(() => String, { nullable: true })
  token?: string;
}
