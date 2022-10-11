import { ITrack } from "./ITrack";

export enum TrackActionTypes {
    FETCH_TRACKS = "FETCH_TRACKS",
    FETCH_TRACKS_COUNT = "FETCH_TRACKS_COUNT",
    FETCH_TRACKS_ERROR = "FETCH_TRACKS_ERROR"
}

interface FetchTrackAction {
    type: TrackActionTypes.FETCH_TRACKS;
    payload: ITrack[];
}

interface FetchTrackCountAction {
    type: TrackActionTypes.FETCH_TRACKS_COUNT;
    payload: number;
}

interface FetchTrackErrorAction {
    type: TrackActionTypes.FETCH_TRACKS_ERROR;
    payload: string;
}

export type TrackAction = FetchTrackAction | FetchTrackCountAction | FetchTrackErrorAction;
