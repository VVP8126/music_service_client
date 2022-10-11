import React from "react";

interface TrackProgressBarProps {
    left: number;
    right: number;
    onChange: (e) => void;
    isDurationBar: boolean;
}

const TrackProgressBar: React.FC<TrackProgressBarProps> = ({left, right, onChange, isDurationBar}) => {

  function getFormattedDuration(num: number) {
    return Math.trunc(num/(60*60)) 
            ? Math.trunc(num/(60*60)) + "h " 
                + Math.trunc((num - Math.trunc(num/(60*60))*60*60)/60)
                    ? Math.trunc((num - Math.trunc(num/(60*60))*60*60)/60) + "m " + ((num - Math.trunc(num/(60*60))*60*60) - Math.trunc((num - Math.trunc(num/(60*60))*60*60)/60) * 60) + "s"
                    : (num - Math.trunc(num/(60*60))*60*60) + "s"
            : Math.trunc(num/60)
                ? Math.trunc(num/60) + "m " + (num - Math.trunc(num/60) * 60) + "s"
                : num + "s"
  }

  return (
    <div style={{display:"flex"}}>
      <input type={"range"} min={0} max={right} value={left} onChange={onChange} />
      <div style={{fontSize:"12px"}}>
        { isDurationBar 
            ? <div>
                {getFormattedDuration(left)}/{getFormattedDuration(right)}
              </div>
            : <span>{left}/{right}</span>
        }
      </div>
    </div>
  );
}
export default TrackProgressBar;
