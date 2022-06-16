import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar', nullable: false, length: 100 })
  name: string;

  @Column({ name: 'price', type: 'varchar', nullable: false, length: 10 })
  price: string;
}
