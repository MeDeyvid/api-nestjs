import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const product = this.repository.create(createProductDto);
    return this.repository.save(product);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    return await this.repository.findOneById(id);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.repository.preload({
      id,
      ...updateProductDto,
    });

    if (!product) throw new NotFoundException(`Product ${id} not found`);

    return this.repository.save(product);
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    return this.repository.remove(product);
  }
}
