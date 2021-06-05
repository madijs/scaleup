import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import {letterAvatarFormat} from "../../tools/letterAvatarFormat";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
        alignItems:'center'
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
    blue:{
        color: "#2A3540"
    }
}));

export default function LetterAvatar({name="",surname=""}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Avatar className={classes.purple}>{letterAvatarFormat(name,surname)}</Avatar>
            {/*<div className={classes.blue}>{name}</div>*/}
        </div>
    );
}