import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";

import mongoose, { Document, mongo } from "mongoose";

@Schema({timestamps:true})
export class Url extends Document{
    @Prop({type:mongoose.Types.ObjectId,ref:"User"})
    userId:string

    @Prop()
    url:string

    @Prop()
    shortUrl:string
}


export const UrlSchema = SchemaFactory.createForClass(Url)