import { Button } from "@mui/material";
import React, { useRef } from "react";

interface FileUploadProps {
    setFile: Function;
    accept: string;
}

const FileUpload: React.FC<FileUploadProps> = ( { setFile, accept } ) => {

  const ref = useRef<HTMLInputElement>();
  const onUploadedFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    setFile(e.target.files[0]);
  }

  return (
    <div style={{textAlign:"center"}}>
      <Button onClick={() => ref.current.click()} variant="contained" >UPLOAD</Button>
      <input    type={"file"}
                accept={accept} 
                style={{display:"none"}} 
                ref={ref} 
                onChange={onUploadedFileChange} />
    </div>
  );
}
export default FileUpload;
