
import {Schema,Prop, SchemaFactory} from "@nestjs/mongoose"

@Schema()
export class User {
  @Prop()
  id: String;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  token: string;

  @Prop()
  resetToken: string;

  @Prop()
  resetTokenExpire: Date;

  @Prop()
  isAdmin:boolean;

  @Prop()
  createdAt: Date;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User)