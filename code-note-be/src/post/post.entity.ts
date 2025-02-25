import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Post {
  @ObjectIdColumn()
  _id: ObjectId | string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('')
  code: string[];
}
