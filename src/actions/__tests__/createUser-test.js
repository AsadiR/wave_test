import configureMockStore from 'redux-mock-store'
import expect from 'expect';
import signIn from '../createUser';
import * as types from '../../constants/actionTypes';

const mockStore = configureMockStore();

// В случае разработки комерческого софта, тестами были бы покрыты все use case-ы и action-ы.
describe('create user tests', () => {
    it('user created', () => {
        const full_name = "Иванов Иван Иванович";
        const birth_date = "1994-07-23";
        const adress = "Sumskaya street 20";
        const city = "Moscow";
        const phone_number = "8-800-800-00-00";
        const expectedActions = [
            {
                type: types.CREATE_USER_SUCCESS,
                full_name,
                birth_date,
                adress,
                city,
                phone_number,
            },
        ];

        const store = mockStore({});
        store.dispatch(signIn(full_name, birth_date, adress, city, phone_number));
        expect(store.getActions()).toEqual(expectedActions);
    });
});