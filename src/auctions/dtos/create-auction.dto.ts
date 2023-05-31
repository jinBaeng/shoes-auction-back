import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Auction } from '../entities/auctions.entity';
import { IsBase64, IsNumber, IsOptional, IsString } from 'class-validator';
import { ReadStream } from 'typeorm/platform/PlatformTools';

// @InputType()
// export class CreateAuctionInput extends OmitType(Auction, [
//   'id',
//   'createdAt',
//   'updatedAt',
//   'userId',
//   'img',
// ]) {}

@InputType()
export class CreateAuctionInput {
  @Field((type) => String)
  @IsString()
  title: string;

  @Field((type) => Number)
  @IsNumber()
  price: number;

  @Field((type) => String, { nullable: true })
  @IsOptional()
  @IsString()
  content?: string;
}

@ObjectType()
export class CreateAuctionOutput extends CoreOutput {
  @Field(() => Number, { nullable: true })
  auctionId?: number;
}
