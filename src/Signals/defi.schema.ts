import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class DefiProject {
  @Prop()
  id: String;

  @Prop()
  icon: string;

  @Prop()
  name: string;

  @Prop()
  currentPrice: number;

  @Prop()
  info: [string];

  @Prop()
  createdAt: Date;

  @Prop()
  isActive: boolean;
}

export type DefiProjectDocument = DefiProject & Document;

export const DefiProjectSchema = SchemaFactory.createForClass(DefiProject);
