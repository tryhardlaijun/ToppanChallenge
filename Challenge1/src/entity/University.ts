import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class University {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column()
  name!: string;

  @Column()
  country!: string;

  @Column("simple-array")
  webpages!: string[];

  @Column({ default: false })
  isBookmark!: boolean;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  lastModified!: Date;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ nullable: true })
  deletedAt?: Date;
}
