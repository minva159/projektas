import React, { useEffect } from "react";
import { TextField, withStyles, Button } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/postUser";
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn } from "@material-ui/icons";

const initialFieldValues = {
    name: '',
    surname: '',
    email: '',
    age: ''
}

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1)
        },
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        
    },
    postBtn: {
        width: "50%"
    }
})

const PostUserForm = ({ classes, ...props }) => {

    useEffect(() => {
        if (props.currentId !== 0){
            setValues({
                ...props.postUserList.find(x => x._id === props.currentId)
            })
            setErrors({})
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.currentId])

    function validate() {
        let temp = { ...errors };
        temp.name = values.name ? '' : 'This field is required.';
        temp.surname = values.surname ? '' : 'This field is required.';
        temp.email = values.email ? '' : 'This field is required.';
        temp.age = values.age ? '' : 'This field is required.';
        setErrors({
            ...temp
        });
        return Object.values(temp).every(x => x === "");
    }

    var {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues,props.setCurrentId)

    const handleSubmit = e => {
        e.preventDefault()
        const onSuccess = () => {
            ButterToast.raise({
                content: <Cinnamon.Crisp name="Register of guests and participants"
                    content="Submitted successfully"
                    scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                    icon={<AssignmentTurnedIn />}
                />
            })
            resetForm()
        }
        if (validate()) {
            if (props.currentId === 0)
                props.createPostUser(values, onSuccess)
            else
                props.updatePostUser(props.currentId, values, onSuccess)
        }
    }

    return (
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}
            onSubmit={handleSubmit}>
            <TextField
                name="name"
                variante="outlined"
                label="Name"
                fullWidth
                value={values.name}
                onChange={handleInputChange}
                {...(errors.name && { error: true, helperText: errors.name })}
            />
            <TextField
                name="surname"
                variante="outlined"
                label="Surname"
                fullWidth
                value={values.surname}
                onChange={handleInputChange}
                {...(errors.surname && { error: true, helperText: errors.surname })}
            />
            <TextField
                name='email'
                variante= 'outlined'
                label='Email'
                fullWidth
                value = {values.email}
                onChange={handleInputChange}
            {...(errors.email && {error:true, helperText:errors.email})}>

            </TextField>
            <TextField
                name='age'
                variante= 'outlined'
                label='Age'
                fullWidth
                value = {values.age}
                onChange={handleInputChange}
                {...(errors.age && {error:true, helperText:errors.age})}>

                </TextField>
            <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                className={classes.postBtn}
            >Submit</Button>
        </form>
    );
}


const mapStateToProps = state => ({
    postUserList: state.postUser.list
})

const mapActionToProps = {
    createPostUser: actions.create,
    updatePostUser: actions.update
}


export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(PostUserForm));