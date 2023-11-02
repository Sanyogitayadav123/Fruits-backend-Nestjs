import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema()
export class Fruits{
    @Prop()
    fruitname: string
    
    @Prop()
    description: string
    
    @Prop()
    fruitImage: string

    _id: string; // Add this line
    
}
export type FruitsDocument = Fruits & Document & { _id: string };

export const FruitsSchema = SchemaFactory.createForClass(Fruits)