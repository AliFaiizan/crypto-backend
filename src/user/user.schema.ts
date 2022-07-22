
import {Schema,Prop, SchemaFactory} from "@nestjs/mongoose"

@Schema()
export class User {

@Prop()
id:String;

@Prop()
  email: {
    type: String,
    required: true,
  }

  @Prop()
  password: {
    type: String,
    required: true,
  }
  @Prop()
  resetToken: String
  @Prop()
  resetTokenExpire: Date
  @Prop()
  createdAt: Date
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User)