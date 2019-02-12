import { object, string } from 'yup';
import PhoneNumber from 'awesome-phonenumber';

export default object().shape({
    name: string().required('A name is required'),
    phone: string().test(
        'phone-number',
        'Phone number is invalid',
        value => value === '' || new PhoneNumber(value, 'US').toJSON().possible
    ),
    email: string().email('Email is invalid')
});
