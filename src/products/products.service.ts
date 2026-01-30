import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../core';
import { PaginationDto } from 'src/common';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.prismaService.products.create({
      data: createProductDto,
    });

    return product;
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const totalItems = await this.prismaService.products.count({
      where: { available: true }
    });
    const lastPage = Math.ceil(totalItems / limit!);

    return {
      data: await this.prismaService.products.findMany({
        skip: (page! - 1) * limit!,
        take: limit,
        where: { available: true }
      }),
      meta: {
        total: totalItems,
        lastPage,
        page
      }
    };
  }

  async findOne(id: number) {
    const product = await this.prismaService.products.findFirst({
      where: { id, available: true }
    });

    if(!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }

    return product;
  }

  async update(updateProductDto: UpdateProductDto) {
    const product = await this.prismaService.products.update({
      where: { id: updateProductDto.id },
      data: updateProductDto
    });

    if(!product) {
      throw new NotFoundException('Could not be edited product');
    }
    
    return product;
  }

  async remove(id: number) {
    await this.findOne(id);

    // return await this.prismaService.products.delete({
    //   where: { id }
    // });

    // sooft delete
    return await this.prismaService.products.update({
      where: { id },
      data: {
        available: false
      }
    })
  }
}
