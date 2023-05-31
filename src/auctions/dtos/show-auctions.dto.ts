import { CoreOutput } from 'src/common/dtos/output.dto';
import { Auction } from '../entities/auctions.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ShowAuctionsOutput extends CoreOutput {
  @Field(() => [Auction])
  auctions?: Auction[];
}
