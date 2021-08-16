import React from 'react'
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core'
import { useFormik } from 'formik';
export const Login = () => {
    const validate = (values: any) => {
        const errors: any = {};
        if (!values.password) {
            errors.password = 'Обязательное поле';
        } else if (values.password.length < 5) {
            errors.password = 'Введите более 5 символов';
        }
        if (!values.email) {
            errors.email = 'Обязательное поле';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Не правильный формат Email';
        }
        return errors;
    };
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            alert(JSON.stringify(values));
        },
        validate
    });
    return <Grid container justify="center">
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}>here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            type='email'
                            {...formik.getFieldProps('email')}
                        />
                        {formik.errors.email && <pre style={{color: 'red'}}>{formik.errors.email}</pre>}
                        <TextField
                            label="Password"
                            margin="normal"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.errors.password && <pre style={{color: 'red'}}>{formik.errors.password}</pre>}
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox
                                name={'rememberMe'}
                                onChange={formik.handleChange}
                                value={formik.values.rememberMe}
                            />}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}
