import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";

import "reflect-metadata";

@Entity()
export default class Movie extends BaseEntity {
  @PrimaryColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  desc!: string;

  @Column()
  img!: string;
}
