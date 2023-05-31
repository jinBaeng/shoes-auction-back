import {
  ArgsType,
  Field,
  InputType,
  ObjectType,
  PartialType,
} from '@nestjs/graphql';
import { CreateAuctionInput } from './create-auction.dto';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
class UpdateAuctionInputType extends PartialType(CreateAuctionInput) {}

@InputType()
export class UpdateAuctionInput {
  @Field((type) => Number)
  id: number;

  @Field((type) => UpdateAuctionInputType)
  data: UpdateAuctionInputType;
}

@ObjectType()
export class UpdateAuctionOutput extends CoreOutput {}
