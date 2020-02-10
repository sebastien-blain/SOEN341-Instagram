import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    text: {
        fontSize: '11px',
    },
}));

const Comment = (props) => {

    const classes = useStyles();

    return (
        <Typography className={classes.text}>{props.user}: {props.comment}</Typography>
    );
}

export default Comment