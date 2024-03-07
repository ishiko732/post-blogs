import { Injectable } from '@nestjs/common';
import { CreateFsrInput } from './dto/create-fsr.input';
import { UpdateFsrInput } from './dto/update-fsr.input';

@Injectable()
export class FsrsService {
  create(createFsrInput: CreateFsrInput) {
    return 'This action adds a new fsr';
  }

  findAll() {
    return `This action returns all fsrs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fsr`;
  }

  update(id: number, updateFsrInput: UpdateFsrInput) {
    return `This action updates a #${id} fsr`;
  }

  remove(id: number) {
    return `This action removes a #${id} fsr`;
  }
}
