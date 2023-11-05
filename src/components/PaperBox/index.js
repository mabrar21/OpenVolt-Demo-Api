import React from "react";
import {Paper} from "@mui/material";
import PropTypes from 'prop-types';

export const PaperBox = ({children, ...props}) => {
    return (
        <Paper
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '2vh',
                ...props.sx
            }}
            elevation={3}
        >
            {props.title && <h1>{props.title}</h1>}
            {children}
        </Paper>
    )
}

PaperBox.propTypes = {
    children: PropTypes.any,
    title: PropTypes.string,
}