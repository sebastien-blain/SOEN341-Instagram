import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CommentIcon from '@material-ui/icons/Comment';
import Comment from './imageBox/Comment'


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

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
	const [liked, setLiked] = React.useState(props.image.like);
	const [open, setOpen] = React.useState(false);
	const [comments, setComments] = React.useState(props.image.comments);
	const [currentComment, setCurrentComment] = React.useState(undefined);
	const [numLike, setNumLike] = React.useState(props.image.nb_like);

	const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const updateLike = () => {
		if(liked){
			setNumLike(numLike - 1);
		}
		else{
			setNumLike(numLike + 1);
		}
		setLiked(!liked);
	}

	const updateComment = (e) => {
		setCurrentComment(e.target.value);
	}

	const leaveComment = () => {
		let tempComment = comments;
		tempComment.push(
			{
				user: props.currentUser,
				comment: currentComment
			}
		);
		console.log(tempComment);
		setComments(tempComment);
		setOpen(false);
	}

	return (
		<Card className={classes.root}>
			<Typography variant="h5" style={{padding: '10px 20px 10px 20px'}}>
				{props.image.user}
			</Typography>

			<CardMedia
				className={classes.media}
				image={props.image.url}
				title=""
			/>

			<CardContent>
				<Typography className={classes.text} variant="body2" color="textSecondary" component="p">
					{props.image.description}
				</Typography>
			</CardContent>

			<CardActions disableSpacing>
				<Typography variant="h6">
					{numLike}
				</Typography>
				<IconButton aria-label="like" style={liked ? {color: 'red'} : {color: 'black'}} onClick={updateLike}>
					<FavoriteIcon />
				</IconButton>
				<IconButton aria-label="comment" onClick={handleClickOpen}>
					<CommentIcon />
				</IconButton>

				<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth maxWidth={false}>
        	<DialogContent>
						<DialogContentText>
							Type a comment here
						</DialogContentText>
						<TextField
							autoFocus
							margin="dense"
							id="name"
							label="Comment"
							type="text"
							fullWidth
							onChange={updateComment}
						/>
        	</DialogContent>
        	<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
						<Button onClick={leaveComment} color="primary">
							Comment
						</Button>
        	</DialogActions>
      	</Dialog>

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
					<div>
						{comments.map( (comment, index) => {
							return (
								<Comment user={comment.user} comment={comment.comment} key={index}/>
							)
						})}
					</div>
				</CardContent>
			</Collapse>
		</Card>
	);
}

export default ImageBox
