import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema()
export class User{
    @Prop()
    name: string
    
    @Prop()
    email: string
    
    @Prop()
    password: string
    
    @Prop()
    phone: number

    _id: string; // Add this line
    
}



export type UserDocument = User & Document & { _id: string };

export const UserSchema = SchemaFactory.createForClass(User)