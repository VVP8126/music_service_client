import { ITrack } from "./ITrack";

export interface TrackState {
    tracks: ITrack[];
    count: number;
    error: string;
}
