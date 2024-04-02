import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto, paginateDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { PropertyEntity } from './entities/propertyEntity.entity';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async create(
    @Body() createPropertyDto: CreatePropertyDto,
    @UploadedFiles() //   validators: [
    //     // new MaxFileSizeValidator({ maxSize: 1000 }),
    files // new ParseFilePipe({
    //     // new FileTypeValidator({ fileType: 'image/jpeg' }),
    //   ],
    // }),
    : Array<Express.Multer.File>,
  ) {
    let imagePath = files[0].path.toString();
    let kycPath = files[1].path.toString();
    createPropertyDto.image = imagePath;
    createPropertyDto.kyc = kycPath;
    return await this.propertyService.create(createPropertyDto);
  }

  // @Get()
  // findAll(@Query() queryParams: string) {
  //   // Do something with the query parameters
  //   return queryParams;
  // }

  @Get()
  async findAll(
    @Query()  searchTerm: { [key: string]: any },
    @Query('page') page = 0,
    @Query('limit') limit = 10,
  ) {
    limit = limit > 10 ? 10 : limit;
    return await this.propertyService.findAll(searchTerm, { page, limit });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(AnyFilesInterceptor())
  update(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    let imagePath = files[0]?.path.toString();
    let kycPath = files[1]?.path.toString();
    updatePropertyDto.image = imagePath;
    updatePropertyDto.kyc = kycPath;
    return this.propertyService.update(+id, updatePropertyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertyService.remove(+id);
  }
}
