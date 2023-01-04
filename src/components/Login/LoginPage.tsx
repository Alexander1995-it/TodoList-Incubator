import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";

type ErrorsType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const LoginPage = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: values => {
            const errors: ErrorsType = {};

            if (!values.email) {
                errors.email = 'Required';
            } else if (values.email.length > 15) {
                errors.email = 'Must be 15 characters or less';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }

            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 6) {
                errors.password = 'Min 6 characters';
            }
            return errors;
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
                                   onBlur={formik.handleBlur} value={formik.values.email} label="Email"
                                   margin="normal"/>
                        {formik.touched.email && formik.errors.email &&
                            <div style={{color: 'red'}}>{formik.errors.email}</div>}
                        <TextField id="password" name="password" type="password" onChange={formik.handleChange}
                                   onBlur={formik.handleBlur} value={formik.values.password} label="Password"
                                   margin="normal"
                        />
                        {formik.touched.password && formik.errors.password &&
                            <div style={{color: 'red'}}>{formik.errors.password}</div>}
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