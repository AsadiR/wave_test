import * as types from "../constants/actionTypes";

export function openCreateUserDialog() {
    return {
        type: types.OPEN_CREATE_USER_DIALOG,
    }
}

export function openUpdateUserDialog(id) {
    return {
        type: types.OPEN_UPDATE_USER_DIALOG,
        selected_user_id: id,
    }
}

export function openDeleteUserDialog(id) {
    return {
        type: types.OPEN_DELETE_USER_DIALOG,
        selected_user_id: id,
    }
}

export function closeAnyDialog() {
    return {
        type: types.CLOSE_ANY_DIALOG
    }
}