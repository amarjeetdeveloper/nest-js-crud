import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyDto } from './create-property.dto';

export class UpdatePropertyDto extends PartialType(CreatePropertyDto) {
  pname: string;
  leaseStartDate: string;
  noOfYears: number;
  personName: string;
  contactNumber: number;
  email: string;
  image: string;
  kyc: string;
}
