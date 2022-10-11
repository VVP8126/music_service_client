import React, { useState } from "react";

const useInput = (initValue:string) => {
    const [value, setValue] = useState(initValue);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }
    return {value, onChange};
}
export default useInput;
