import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'posts', timestamps: true })
export class Post {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: String, required: true })
  author: string;
}

export const postsSchema = SchemaFactory.createForClass(Post);
