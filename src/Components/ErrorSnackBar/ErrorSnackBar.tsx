import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {Color} from "@material-ui/lab/Alert/Alert";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {setErrorAC} from "../../state/app-reducer";
type ErrorSnackBarPropsType = {

}

function Alert(props: AlertProps) {
    //сюда в пропсах придут чайлды и они же прокинуться в MuiAlert
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const ErrorSnackBar: React.FC<ErrorSnackBarPropsType> = (props) => {
    const dispatch = useDispatch()
    const error = useSelector<AppRootStateType, null | string>(state => state.appReducer.error);

    const [type, setType] = React.useState<Color>('error');
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setErrorAC(null))
    };
    const isOpen = error !== null
    return <>
        <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={type} >
                {error}
            </Alert>
        </Snackbar>
    </>
}