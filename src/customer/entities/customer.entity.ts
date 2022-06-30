import { Expose } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer_T {
  @PrimaryGeneratedColumn({ name: 'rec_id' })
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'middle_name' })
  middleName: string;

  @Column()
  organization: number;

  @Column({ name: 'created_by' })
  createdBy: number;

  @Column({ name: 'updated_by' })
  updatedBy: number;

  @Column({ name: 'created' })
  created: string;

  @Column({ name: 'updated' })
  updated: string;

  @Expose()
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
