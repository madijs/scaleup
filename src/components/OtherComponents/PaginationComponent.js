import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(5),
        },
        '& .Mui-selected': {
            background: 'rgba(0, 135, 90, 0.1)',
            color:'#00875A',
        },
        '& .MuiPaginationItem-page':{
            background: 'rgba(143, 146, 161, 0.1)',
            width: 42,
            height: 42,
            fontWeight: 'bold'
        }
    },
}));

export default function PaginationComponent({count,page,handleChangeQuestion,save}) {
    const classes = useStyles();

    return (
        <>
            <div className="desktop_pagination">
                <div className={classes.root}>
                    <Pagination
                        page={page} onChange={(e,p)=>{
                        handleChangeQuestion(e,p);
                        save()
                    }}  count={count} hidePrevButton />
                </div>
            </div>
            <div className="mobile_pagination">
                <div className={classes.root}>
                    <Pagination
                        size="small"
                        page={page} onChange={(e,p)=>{
                        handleChangeQuestion(e,p);
                        save(true)
                    }}  count={count} hidePrevButton />
                </div>
            </div>
        </>

    );
}