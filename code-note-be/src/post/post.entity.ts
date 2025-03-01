import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { CodeItemDto } from './dto/code-item.dts';

@Entity()
export class Post {
  @ObjectIdColumn()
  _id: ObjectId | string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('json') // Dùng type 'json' để lưu mảng object
  code: CodeItemDto[];

  @Column()
  type: string;
}
