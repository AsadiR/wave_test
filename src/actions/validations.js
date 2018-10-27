

// при необходимости здесь можно добавить любые проверки...
export default function validate(full_name, birth_date, adress, city, phone_number) {
    var errors = {};
    validateFullName(full_name, errors);
    validateBirtDate(birth_date, errors);
    validateAdress(adress, errors);
    validateCity(city, errors);
    validatePhoneNumber(phone_number, errors);

    return errors;
}

function validateFullName(full_name, errors) {
    if (full_name.length === 0 || full_name.length > 100)
        errors["full_name"] = "Введите ФИО, но не более 100 символов";
}
function validateBirtDate(birth_date, errors) {
    if (!birth_date || birth_date.length === 0)
        errors["birth_date"] = "Введите дату рождения";
}

function validateAdress(adress, errors) {
    if (adress.length === 0)
        errors["adress"] = "Введите адрес проживание";
}

function validateCity(city, errors) {
    if (city.length === 0)
        errors["city"] = "Введите название города";
}

function validatePhoneNumber(phone_number, errors) {
    var starts_with_8 = phone_number.length >= 2 && phone_number[0] === "8";
    var start_with_plus_7 = phone_number.length >= 2 && phone_number[0] === "+" && phone_number[1] === "7";
    if (!starts_with_8 && ! start_with_plus_7)
        errors["phone_number"] = 'Введите корректный номер телефона';

}