import * as types from '../constants/actionTypes';
import * as dialogTypes from "../constants/dialogTypes";

const initialState = {
    id_counter: 0,
    users: {},
    errors: null,

    opened_dialog: null,
    selected_user_id: null,
};

export default function reducer(state = initialState, action = {}) {
    var users;
    switch (action.type) {
        case types.CREATE_USER_SUCCESS:
            users =  {...state.users};
            users[state.id_counter] = ({
                id: state.id_counter,
                full_name: action.full_name,
                birth_date: action.birth_date,
                adress: action.adress,
                city: action.city,
                phone_number: action.phone_number,
            });
            return {
                ...state,
                users,
                id_counter: state.id_counter + 1,
                errors: null,
                opened_dialog: null,
            };
        case types.UPDATE_USER_SUCCESS:
            users =  {...state.users};
            users[action.id] = ({
                id: action.id,
                full_name: action.full_name,
                birth_date: action.birth_date,
                adress: action.adress,
                city: action.city,
                phone_number: action.phone_number,
            });
            return {
                ...state,
                users,
                errors: null,
                opened_dialog: null,
            };
        case types.CREATE_USER_ERROR:
        case types.UPDATE_USER_ERROR:
            return {
                ...state,
                errors: action.errors
            };
        case types.DELETE_USER:
            users =  {...state.users};
            delete users[action.id];
            return {
                ...state,
                users: users,
                opened_dialog: null,
            };
        case types.OPEN_CREATE_USER_DIALOG:
            return {
                ...state,
                opened_dialog: dialogTypes.CREATE_USER_DIALOG,
                errors: null,
            };
        case types.OPEN_UPDATE_USER_DIALOG:
            return {
                ...state,
                opened_dialog: dialogTypes.UPDATE_USER_DIALOG,
                selected_user_id: action.selected_user_id,
                errors: null,
            };
        case types.OPEN_DELETE_USER_DIALOG:
            return {
                ...state,
                opened_dialog: dialogTypes.DELETE_USER_DIALOG,
                selected_user_id: action.selected_user_id,
            };
        case types.CLOSE_ANY_DIALOG:
            return {
                ...state,
                opened_dialog: null,
            };
        default:
            return state;
    }
}