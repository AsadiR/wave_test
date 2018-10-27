import * as types from "../constants/actionTypes";

function ok(id) {
    return {
        type: types.DELETE_USER,
        id,
    }
}

export default function deleteUser(id) {
    return ok(id)
}
