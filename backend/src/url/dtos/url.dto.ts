import { IsNotEmpty } from "class-validator";

export class UrlDto{
    @IsNotEmpty()
    url:string
}