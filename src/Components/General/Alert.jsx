import React from 'react'
import { useSelector , useDispatch} from "react-redux"
import Alert from 'react-bootstrap/Alert';
import { desetAlertShow } from '../../ReduxStore/Action';


export default function AlertBar() {
    const AlertState = useSelector((state) => state.AlertStatus);
    const dispatch= useDispatch()
    if (AlertState && AlertState.show) {
        setTimeout(() => {
            dispatch(desetAlertShow())
        }, 3000);
        return (
            <Alert style={{position:"fixed", zIndex:"1021", width:"100%" }} variant={AlertState.alertType}>
                {AlertState.title} {AlertState.text}
            </Alert>
        )
    }
}
