import React, {ChangeEvent, useState} from 'react';

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
            <input value={title}
                   onChange={onChangeHandler}
                   // onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={onClickHandler}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default AddItemForm;