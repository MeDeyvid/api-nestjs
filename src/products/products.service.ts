import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

    if (!product.name) throw new BadRequestException('Product name not found');
    if (!product.price)
      throw new BadRequestException('Product price not found');

    return this.repository.save(product);
  }

  findAll() {
    return this.repository.find();
  }

  async findOneById(id: string) {
    const product = await this.repository.findOneById(id);
    console.log(product);
    if (!product) throw new NotFoundException(`Product ${id} not found`);

    return product;
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
    const product = await this.findOneById(id);
    if (!product) throw new NotFoundException(`Product ${id} not found`);

    return this.repository.remove(product);
  }
}
