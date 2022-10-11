import { Pagination } from "@mui/material";
import React from "react";

const TrackPagination = ({ itemsInPage, totalItemCount, onChangeHandler }) => {

    return (
        <Pagination count={ Math.ceil(totalItemCount / itemsInPage) } 
                    onChange={ onChangeHandler } 
                    style={{margin:"0 auto", textAlign:"center"}} 
                    variant="text" 
                    shape="rounded" 
                    color="primary" />
    );
}
export default TrackPagination;
