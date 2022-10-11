import { TrackActionTypes, TrackAction } from "../../types/TrackAction";
import { TrackState } from "../../types/TrackState"

const initState: TrackState = {
    tracks: [],
    count: 0,
    error: ""
}

export const trackReducer = ( state=initState, action:TrackAction ): TrackState => {
    switch (action.type) {
        case TrackActionTypes.FETCH_TRACKS:
            return { ...state, error:"", tracks:action.payload };
        case TrackActionTypes.FETCH_TRACKS_COUNT:
            return { ...state, error:"", count:action.payload };
        case TrackActionTypes.FETCH_TRACKS_ERROR:
            return { ...state, error:action.payload };
        default:
            return state;
    }
}
