import React, {Component} from 'react';
import Modal from 'react-modal';
import {Input, Button, Form, FormGroup, Label, Col, Container, Row} from 'reactstrap';
import createUser from "../actions/createUser";
import updateUser from "../actions/updateUser";
import connect from "react-redux/es/connect/connect";
import * as dialogTypes from "../constants/dialogTypes";
import deleteUser from "../actions/deleteUser";
import * as dialogActions from "../actions/dialogActions";

const customStyles = {
    content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    },
    formButtons: {
        margin: "auto",
        width: "30%",
    },
    errorMessages: {
        color: "red",
        fontSize: "0.75em",
        height: "1.25em",
        width: "80%",
    }

};

/*
props: {
    opened_dialog,
    data,
    title,
}

 */


class UserFormDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
                full_name: "",
                birth_date: "",
                adress: "",
                city: "",
                phone_number: "",
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors)
            return;

        if (nextProps.opened_dialog === dialogTypes.UPDATE_USER_DIALOG)
            this.setState({
                full_name: nextProps.data.full_name,
                birth_date: nextProps.data.birth_date,
                adress: nextProps.data.adress,
                city: nextProps.data.city,
                phone_number: nextProps.data.phone_number,
            });
        else
            this.setState({
                full_name: "",
                birth_date: "",
                adress: "",
                city: "",
                phone_number: "",
            });
    }

    onChangeFullName = (event) => {
        this.setState({full_name: event.target.value});
    };

    onChangeBirthDate = (event) => {
        this.setState({birth_date: event.target.value});
    };

    onChangeAdress = (event) => {
        this.setState({adress: event.target.value});
    };

    onChangeCity = (event) => {
        this.setState({city: event.target.value});
    };

    onChangePhoneNumber = (event) => {
        this.setState({phone_number: event.target.value});
    };

    createOkCallback() {
        if (this.props.opened_dialog === dialogTypes.CREATE_USER_DIALOG) {
            return () => {
                this.props.createUser(
                    this.state.full_name, this.state.birth_date,
                    this.state.adress, this.state.city, this.state.phone_number
                );
            };
        } else if (this.props.opened_dialog === dialogTypes.UPDATE_USER_DIALOG) {
            return () => {
                this.props.updateUser(
                    this.props.data.id, this.state.full_name, this.state.birth_date,
                    this.state.adress, this.state.city, this.state.phone_number
                );
            }
        } else if (this.props.opened_dialog === dialogTypes.DELETE_USER_DIALOG) {
            return () => {
                this.props.deleteUser(this.props.data.id);
            };
        } else
            return () => {};

    }

    getErrorMessage(key) {
        if (this.props.errors && this.props.errors[key])
            return (
                <div style={customStyles.errorMessages}>
                    {this.props.errors[key]}
                </div>
            );
        else
            return <div style={customStyles.errorMessages}/>;
    }

    isOpened() {
        return this.props.opened_dialog != null;
    }

    form() {
        if (this.props.opened_dialog === dialogTypes.DELETE_USER_DIALOG)
            return null;
        else
            return (
                <Form>
                    <FormGroup row>
                        <Label sm={4}>ФИО:</Label>
                        <Col sm={8}>
                            <Input value={this.state.full_name} onChange={this.onChangeFullName}/>
                        </Col>
                        <Col sm={{offset: 4, size: 8}}>
                            {this.getErrorMessage("full_name")}
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={4}>Дата рождения:</Label>
                        <Col sm={8}>
                            <Input type="date" value={this.state.birth_date} onChange={this.onChangeBirthDate}/>
                        </Col>
                        <Col sm={{offset: 4, size: 8}}>
                            {this.getErrorMessage("birth_date")}
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={4}>Адрес:</Label>
                        <Col sm={8}>
                            <Input value={this.state.adress} onChange={this.onChangeAdress}/>
                        </Col>
                        <Col sm={{offset: 4, size: 8}}>
                            {this.getErrorMessage("adress")}
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={4}>Город:</Label>
                        <Col sm={8}>
                            <Input value={this.state.city} onChange={this.onChangeCity}/>
                        </Col>
                        <Col sm={{offset: 4, size: 8}}>
                            {this.getErrorMessage("city")}
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={4}>Номер телефона:</Label>
                        <Col sm={8}>
                            <Input value={this.state.phone_number}
                                   type="tel"
                                   pattern="+7-[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}"
                                   placeholder="+7-xxx-xx-xx-xx"
                                   onChange={this.onChangePhoneNumber}/>
                        </Col>
                        <Col sm={{offset: 4, size: 8}}>
                            {this.getErrorMessage("phone_number")}
                        </Col>
                    </FormGroup>
                </Form>
            );
    }

    render() {
        var ok_callback = this.createOkCallback();

        return (

            <Modal
                isOpen={this.isOpened()}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel={this.state.tittle}
                ariaHideApp={false}
            >
                <h2>{this.props.tittle}</h2>
                <Container>
                    {this.form()}
                    <Row>
                        <Col sm={6}>
                            <div style={customStyles.formButtons}>
                                <Button onClick={ok_callback}>
                                    Ok
                                </Button>
                            </div>
                        </Col>
                        <Col sm={6}>
                            <div style={customStyles.formButtons}>
                                <Button onClick={this.props.closeAnyDialog}>
                                    Close
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    errors: state.errors,
});

const mapDispatchToProps = dispatch => ({
    createUser: (full_name, birth_date, adress, city, phone_number) => dispatch(
        createUser(full_name, birth_date, adress, city, phone_number)
    ),
    updateUser: (id, full_name, birth_date, adress, city, phone_number) => dispatch(
        updateUser(id, full_name, birth_date, adress, city, phone_number)
    ),
    deleteUser: id => dispatch(
        deleteUser(id)
    ),
    closeAnyDialog: () => dispatch(dialogActions.closeAnyDialog()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserFormDialog)