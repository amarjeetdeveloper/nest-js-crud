import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { PropertyEntity } from './entities/propertyEntity.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PropertyEntity]),
    MulterModule.register({ dest: './files' }),
  ],
  controllers: [PropertyController],
  providers: [PropertyService],
})
export class PropertyModule {}
