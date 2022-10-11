import { Dispatch } from "react";
import { TrackAction } from "../../types/TrackAction";
import { TrackActionTypes } from "../../types/TrackAction";
import axios from "axios";

export const fetchTracks = () => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const responce = await axios.get("http://localhost:5000/track/all");
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS,
                payload: responce.data,
            });
        } catch (error) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: "Track load error: " + error.message
            });
        }
    }
}

export const searchTrack = (query: string) => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const responce = await axios.get(`http://localhost:5000/track/search?query=${query}`);
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS,
                payload: responce.data,
            });
        } catch (error) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: "Track load error: " + error.message
            });
        }
    }
}

export const fetchWithPagination = (count: number, offset: number) => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const responce = await axios.get(`http://localhost:5000/track/all?count=${count}&offset=${offset}`);
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS,
                payload: responce.data,
            });
        } catch (error) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: "Track load error: " + error.message
            });
        }
    }
}

export const fetchTrackCount = () => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const responce = await axios.get(`http://localhost:5000/track/count`);
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_COUNT,
                payload: responce.data,
            });
        } catch (error) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: "Track count not found: " + error.message
            });
        }
    }
}
