import * as types from "../constants/actionTypes";
import validate from './validations';

function ok(id, full_name, birth_date, adress, city, phone_number) {
    return {
        type: types.UPDATE_USER_SUCCESS,
        id, full_name, birth_date, adress, city, phone_number
    }
}

function error(errors) {
    return {
        type: types.UPDATE_USER_ERROR,
        errors,
    };
}

export default function updateUser(id, full_name, birth_date, adress, city, phone_number) {
    const errors = validate(full_name, birth_date, adress, city, phone_number);
    if (Object.keys(errors).length === 0) {
        return ok(id, full_name, birth_date, adress, city, phone_number);
    } else {
        return error(errors);
    }
}
