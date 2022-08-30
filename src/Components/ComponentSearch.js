import React from "react";
import { useState, useEffect } from "react";
import { TextField, Autocomplete } from '@mui/material/';


export default function ComponentSearch(props) {
    const [data, setData] = useState('')
    const handleChange = (e, value) => {
        setData(value.label)
        props.onChange(value)
    }
    return (
        <Autocomplete
            disablePortal
            disableClearable
            id="combo-box-demo"
            onChange={handleChange}
            isOptionEqualToValue={((option, value) => option.label === value || "")}
            options={props.array}
            fullWidth
            value={data}
            renderInput={(params) => <TextField {...params} label='search' />}
        />)
}