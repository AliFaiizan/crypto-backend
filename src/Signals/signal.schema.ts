import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Signal {
  @Prop()
  id: String;

  @Prop()
  type:string
  @Prop()
  icon: string;

  @Prop()
  name: string;

  @Prop()
  currentPrice: number;

  @Prop()
  entry: number;

  @Prop()
  stopLoss: number;

  @Prop()
  targets: [
    {
      value: number;
      roi: string;
    },
  ];

  @Prop()
  info:[string]
  
  @Prop()
  availableExchanges: [string];

  @Prop()
  createdAt: Date;
  @Prop()
  isActive: boolean;
}

export type SignalDocument = Signal & Document;

export const SignalSchema = SchemaFactory.createForClass(Signal);
