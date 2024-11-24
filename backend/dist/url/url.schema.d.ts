import mongoose, { Document } from "mongoose";
export declare class Url extends Document {
    userId: string;
    url: string;
    shortUrl: string;
}
export declare const UrlSchema: mongoose.Schema<Url, mongoose.Model<Url, any, any, any, mongoose.Document<unknown, any, Url> & Url & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Url, mongoose.Document<unknown, {}, mongoose.FlatRecord<Url>> & mongoose.FlatRecord<Url> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
