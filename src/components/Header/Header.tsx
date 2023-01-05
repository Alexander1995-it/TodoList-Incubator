import React from 'react';
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useAppSelector} from "../../common/hooks/hooks";
import {NavLink} from "react-router-dom";

const Header = () => {


    const login = useAppSelector(state => state.auth)

    return (
        <div>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            TodoList
                        </Typography>
                        {login.isLoggedIn
                            ? <NavLink to='login'><Button color="inherit">Logout</Button></NavLink>
                            : <NavLink to='login'><Button color="inherit">Login</Button></NavLink>}
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
};

export default Header;