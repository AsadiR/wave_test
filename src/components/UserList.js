import React, {Component} from 'react';
import { Table, Button } from 'reactstrap';
import { connect } from 'react-redux'

import UserFormDialog from './UserFormDialog';
import User from './User';
import * as dialogActions from '../actions/dialogActions';
import * as dialogTypes from "../constants/dialogTypes";

class UserList extends Component {
    constructor(props) {
        super(props);
        this.onClickCreate = this.onClickCreate.bind(this);
    }

    onClickCreate() {
        this.props.openCreateDialog();
    }

    tittle() {
        if (this.props.opened_dialog === dialogTypes.CREATE_USER_DIALOG)
            return "Создание записи о пользователе";
        else if (this.props.opened_dialog === dialogTypes.UPDATE_USER_DIALOG)
            return "Обновление записи о пользователе";
        else if (this.props.opened_dialog === dialogTypes.DELETE_USER_DIALOG)
            return "Удаление записи о пользователе";
        else
            return "";
    }

    render() {
        return (
            <div>
                <UserFormDialog opened_dialog={this.props.opened_dialog}
                                data={this.props.users[this.props.selected_user_id]}
                                tittle={this.tittle()}/>
                <Table>
                    <thead>
                        <tr>
                            <th>ФИО</th>
                            <th>Дата рождения</th>
                            <th>Адрес</th>
                            <th>Город</th>
                            <th>Телефон</th>
                            <th>
                                <Button onClick={this.onClickCreate}>
                                    Create
                                </Button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                           Object.entries(this.props.users).map(
                               ([id, u]) => <User key={u.id} data={u}
                                                  openDeleteDialog={this.props.openDeleteDialog.bind(this, u.id)}
                                                  openUpdateDialog={this.props.openUpdateDialog.bind(this, u.id)}/>
                           )
                       }
                    </tbody>
                </Table>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    users: state.users,
    opened_dialog: state.opened_dialog,
    selected_user_id: state.selected_user_id,
});

const mapDispatchToProps = dispatch => ({
    openCreateDialog: () => dispatch(dialogActions.openCreateUserDialog()),
    openUpdateDialog: (id) => dispatch(dialogActions.openUpdateUserDialog(id)),
    openDeleteDialog: (id) => dispatch(dialogActions.openDeleteUserDialog(id)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList);