import React, {useEffect} from 'react';
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {AuthMeTC} from "../../reducers/loginReducer";
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";

const Header = () => {

    const dispatch = useAppDispatch()
    const login = useAppSelector(state => state.login)

    useEffect(() => {
        dispatch(AuthMeTC())
    }, [])


    return (
        <div>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            TodoList
                        </Typography>
                        {login.isAuth ? login.login : <Button color="inherit">Login</Button>}
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
};

export default Header;