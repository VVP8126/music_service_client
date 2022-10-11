import { IComment } from "./IComment";

export interface ITrack {
    _id:string,
    name:string,
    artist:string,
    text:string,
    listens:number,
    picture:string,
    audio:string,
    comments:IComment[]
}
