import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Auction } from '../entities/auctions.entity';

@InputType()
export class ShowAuctionInput {
  @Field((type) => Number)
  roomId: number;
}

@ObjectType()
export class ShowAuctionOutput extends CoreOutput {
  @Field()
  auction?: Auction;
}
