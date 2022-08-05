import React, {ChangeEvent, useState} from 'react';
import {Button, TextField} from "@mui/material";

type AddItemFormPropsType = {
    callBack: (title: string) => void

}

const AddItemForm = (props: AddItemFormPropsType) => {

    const {callBack} = props
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    // const addTask = () => {
    //     if (title.trim() !== "") {
    //         callBack(title.trim(), todoListID);
    //         setTitle("");
    //     } else {
    //         setError("Title is required");
    //     }
    // }

    const onClickHandler = () => {
        callBack (title)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null);
    //     if (e.charCode === 13) {
    //         addTask();
    //     }
    // }

    return (
        <div>
            <TextField
                // className={error ? "error" : ""}
                // onKeyPress={onKeyPressHandler}
                size={'small'}
                onChange={onChangeHandler}
                value={title}
                id="outlined-basic"
                label="Outlined"
                variant="outlined" />
            <Button
                onClick={onClickHandler}
                variant="contained"
                style={{maxWidth: '38px', maxHeight: '38px', minWidth: '38px', minHeight: '38px'}}
            >
                +
            </Button>


            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default AddItemForm;