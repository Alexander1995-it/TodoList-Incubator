import React from 'react';
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import {NavLink} from "react-router-dom";
import {logoutTC} from "../../reducers/authReducer";

const Header = () => {

    const dispatch = useAppDispatch()
    const login = useAppSelector(state => state.auth)

    const logOutHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <div>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            TodoList
                        </Typography>
                        {login.isLoggedIn && <Button onClick={logOutHandler} color="inherit">Logout</Button>}
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
};

export default Header;