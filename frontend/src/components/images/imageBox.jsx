import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button'
import CommentIcon from '@material-ui/icons/Comment';
import Comment from './imageBox/Comment'

//#region style
const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345,
        fontSize: '14px',
    },
    text: {
        fontSize: '11px',
    },
    subtext: {
        fontSize: '10px',
    },
    media: {
        height: 0,
        paddingTop: '100%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}));
//#endregion

const ImageBox = (props) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <Card className={classes.root}>
            <Typography className={classes.root}>
                {props.image.user}
            </Typography>
            <Typography className={classes.subtext}>
                {props.image.post}
            </Typography>
            <CardMedia
                className={classes.media}
                image={props.image.url}     //"https://i.redd.it/z9l08cn8wde41.png"
                title=""
            />
            <CardContent>
                <Typography className={classes.text} variant="body2" color="textSecondary" component="p">
                    *Liked by...*
        </Typography>
                <Typography className={classes.text} variant="body2" color="textSecondary" component="p">
                    {props.image.description}
                </Typography>

            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="like">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="comment">
                    <CommentIcon />
                </IconButton>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Comment
                        user={props.image.comments.map(block => block.user)}
                        comment={props.image.comments.map(block => block.comment)}>
                    </Comment>
                </CardContent>
            </Collapse>
        </Card>
    );
}

export default ImageBox
