export class CreatePropertyDto {
  pname: string;
  leaseStartDate: string;
  noOfYears: number;
  personName: string;
  contactNumber: number;
  email: string;
  image: string;
  kyc: string;
}

export class paginateDto {
  searchTerm?: string;
  tags?: string[];
  page?: string;
}
