import { Field, ObjectType } from '@nestjs/graphql';

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ChatRoom } from './chatRoom.entity';

@Entity()
@ObjectType()
export class ChatMessage {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'longtext' })
  @Field(() => String)
  message: string;

  @Column({ name: 'is_seller' })
  @Field(() => Boolean)
  isSeller: boolean;

  @CreateDateColumn({ name: 'created_at' })
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Field(() => Date)
  updatedAt: Date;

  @ManyToOne(
    () => ChatRoom, //
    (chatRoom) => chatRoom.chatMessages,
    { onDelete: 'CASCADE' },
  )
  @Field(() => ChatRoom)
  chatRoom: ChatRoom;
}
