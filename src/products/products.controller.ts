import { Product } from './entities/product.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  Public,
  Resource,
  RoleMatchingMode,
  Roles,
  Scopes,
} from 'nest-keycloak-connect';

@ApiTags('Products')
@Controller('products')
@Resource(Product.name)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Scopes('Create')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @Roles({ roles: ['admin', 'other'] })
  findOne(@Param('id') id: string) {
    return this.productsService.findOneById(id);
  }

  @Patch(':id')
  @Scopes('Edit')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @Scopes('Delete')
  @Roles({ roles: ['admin', 'realm:sysadmin'], mode: RoleMatchingMode.ALL })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
