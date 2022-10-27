import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/postUser";
import { Grid, Paper, withStyles, List, ListItem, ListItemText, Typography, Divider, Button } from "@material-ui/core";
import PostUserForm from "./PostUserForm";
import ButterToast, { Cinnamon } from "butter-toast";
import { DeleteSweep } from "@material-ui/icons";

const styles = theme => ({
    paper: {
        margin: theme.spacing(3),
        padding: theme.spacing(2),
        background: '#F6F8F9'
    },
    smMargin: {
        margin: theme.spacing(1)
    },
    actionDiv: {
        textAlign: 'center',
    },
    actionPersonDiv: {
        textAlign: 'center',
        display: 'flex',
        margin: theme.spacing(1),
        background: '#96F0E4'
    },
    actionItem: {
        margin: theme.spacing(1)
    }
})

const PostUsers = ({ classes, ...props })   => {
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllPostUsers()
    }, [props])

    const onDelete = id => {
        const onSuccess = () => {
            ButterToast.raise({
                content: <Cinnamon.Crisp title="Register of guests and participants"
                    content="Deleted successfully"
                    scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                    icon={<DeleteSweep />}
                />
            })
        }
        if (window.confirm('Are you sure you want to remove this person?'))
            props.deletePostUser(id,onSuccess)
    }


    return (
        <Grid container>
            <Grid item xs={5}>
                <Paper className={classes.paper}>
                    <PostUserForm {...{ currentId, setCurrentId }} />
                </Paper>
            </Grid>
            <Grid item xs={7}>
                <Paper className={classes.paper}>
                <List>
                        {
                            props.postUserList.map((record, index) => {
                                return (
                                    <Fragment key={index}>
                                        <ListItem>
                                            <ListItemText>
                                            <div className={classes.actionPersonDiv}>
                                                <Typography variant="h5" className={classes.actionItem}>
                                                    {record.name}
                                                </Typography>
                                                <Typography variant="h5" className={classes.actionItem}>
                                                    {record.surname}
                                                </Typography>
                                                <Typography variant="h5" className={classes.actionItem}>
                                                    {record.email}
                                                </Typography>
                                                <Typography variant="h5" className={classes.actionItem}>
                                                    {record.age}
                                                </Typography>
                                                </div>
                                                <div className={classes.actionDiv}>
                                                    <Button variant="contained" color="primary" size="small"
                                                        className={classes.smMargin}
                                                        onClick={() => setCurrentId(record._id)}>
                                                        Edit
                                                    </Button>
                                                    <Button variant="contained" color="secondary" size="small"
                                                        className={classes.smMargin}
                                                        onClick={() => onDelete(record._id)}>
                                                        Delete
                                                    </Button>
                                                </div>
                                            </ListItemText>
                                        </ListItem>
                                        <Divider component="li" />
                                    </Fragment>
                                )
                            })
                        }
                    </List>
                </Paper>
            </Grid>
        </Grid>
    );
} 

const mapStateToProps = state => ({
    postUserList: state.postUser.list
})

const mapActionToProps = {
    fetchAllPostUsers: actions.fetchAll,
    deletePostUser: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(PostUsers));
