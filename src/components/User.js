import React, {Component} from "react";
import { Button } from 'reactstrap';


/*
props: {
    key: id,
    data: {id, full_name, birth_date, adress, city, phone_number}
    openUpdateDialog:
    openDeleteDialog:
}
*/

const customStyles = {
    buttons: {
        marginLeft: '1em',
    },
};

export default class User extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.data.full_name}</td>
                <td>{this.props.data.birth_date}</td>
                <td>{this.props.data.adress}</td>
                <td>{this.props.data.city}</td>
                <td>{this.props.data.phone_number}</td>
                <td>
                    <Button onClick={this.props.openUpdateDialog}>
                        Update
                    </Button>
                    <Button style={customStyles.buttons} onClick={this.props.openDeleteDialog}>
                        Delete
                    </Button>
                </td>
            </tr>
        );
    }
}