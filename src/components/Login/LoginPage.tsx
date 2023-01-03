import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";

export const LoginPage = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <FormControl>
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <TextField id="email" name="email" type="email" onChange={formik.handleChange}
                                   value={formik.values.email} label="Email" margin="normal"/>
                        <TextField id="password" name="password" type="password" onChange={formik.handleChange}
                                   value={formik.values.password} label="Password"
                                   margin="normal"
                        />
                        <FormControlLabel id="rememberMe" name="rememberMe" onChange={formik.handleChange}
                                          value={formik.values.rememberMe} label={'Remember me'} control={<Checkbox/>}/>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </form>
            </FormControl>
        </Grid>
    </Grid>
}