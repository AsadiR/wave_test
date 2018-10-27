import * as types from "../constants/actionTypes";
import validate from './validations';

function ok(full_name, birth_date, adress, city, phone_number) {
    return {
        type: types.CREATE_USER_SUCCESS,
        full_name, birth_date, adress, city, phone_number
    }
}

function error(errors) {
    return {
        type: types.CREATE_USER_ERROR,
        errors,
    };
}

export default function createUser(full_name, birth_date, adress, city, phone_number) {
    const errors = validate(full_name, birth_date, adress, city, phone_number);
    if (Object.keys(errors).length === 0) {
        return ok(full_name, birth_date, adress, city, phone_number);
    } else {
        return error(errors);
    }
}
