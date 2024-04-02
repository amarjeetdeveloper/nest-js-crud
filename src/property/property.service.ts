import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PropertyEntity } from './entities/propertyEntity.entity';

import {
  IPaginationOptions,
  Pagination,
  paginate,
  paginateRaw,
} from 'nestjs-typeorm-paginate';

@Injectable()
class CustomPaginationMeta {
  constructor(
    public readonly count: number,
    public readonly total: number,
  ) {}
}

export class PropertyService {
  constructor(
    @InjectRepository(PropertyEntity)
    private readonly propertyRepository: Repository<PropertyEntity>,
  ) {}

  async create(createPropertyDto: CreatePropertyDto) {
    const property = this.propertyRepository.create(createPropertyDto);
    return await this.propertyRepository.save(property);
  }

  // when i am trying to create pagination using Nestjs Typeorm paginate in entity they are only taking name @Entity({ name: 'property_entity' })in entity which name we are providing in entity that name database are created in our mysql database
  // simple pagination process
  async findAll(
    searchTerm: string,
    options: IPaginationOptions,
  ): Promise<Pagination<PropertyEntity>> {
    const queryBuilder = this.propertyRepository.createQueryBuilder('property');

    // Apply filtering based on the searchTerm
    if (searchTerm) {
      Object.entries(searchTerm).forEach(([key, value]) => {
        queryBuilder.andWhere(`property.${key} = :${key}`, { [key]: value });
      });
    }

    // Ensure page number is at least 1
    if ((options.page as number) < 1) {
      options.page = 1;
    }

    //  Selecting desired properties
    queryBuilder.select([
      'property.pname',
      'property.leaseStartDate',
      'property.noOfYears',
      'property.personName',
      'property.contactNumber',
      'property.email',
      'property.image',
    ]);
    return await paginate<PropertyEntity>(queryBuilder, options);
  }

  async findOne(id: number) {
    return await this.propertyRepository.findOne({ where: { id } });
  }

  async update(id: number, updatePropertyDto: UpdatePropertyDto) {
    const property = await this.propertyRepository.findOne({ where: { id } });
    console.log('property', property);
    console.log('updatePropertyDto', updatePropertyDto);

    Object.assign(property, updatePropertyDto);
    return await this.propertyRepository.save(property);
  }

  async remove(id: number) {
    const property = await this.propertyRepository.findOne({ where: { id } });
    if (!property) {
      return 'this property details are already deleted or not in database';
    }
    console.log('property', !property);

    return await this.propertyRepository.remove(property);
  }
}
