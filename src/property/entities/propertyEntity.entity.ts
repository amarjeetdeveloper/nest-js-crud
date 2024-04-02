import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'property_entity' })
export class PropertyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pname: string;

  @Column()
  leaseStartDate: string;

  @Column()
  noOfYears: number;

  @Column()
  personName: string;

  @Column()
  contactNumber: number;

  @Column({ nullable: true }) // Making emailId optional
  email: string;

  @Column() // For storing binary data (image)
  image: string;

  @Column() // For storing binary data (image)
  kyc: string;
}
