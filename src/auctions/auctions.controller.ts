import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuctionService } from './auctions.service';

@Controller('auctions')
export class AuctionsController {
  constructor(private auctionService: AuctionService) {}
  @Post('/:auctionId')
  uploadFile(
    @Param('auctionId') auctionId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.auctionService.uploadFile(file, auctionId);
  }
}
