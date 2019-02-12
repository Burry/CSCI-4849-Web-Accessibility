// Action Types
const ADD_CONTACT = 'phone/contacts/ADD_CONTACT';

// Reducer
export default (
    state = {
        list: [
            {
                name: 'Robert Drake',
                phone: '(555) 555-1111',
                email: 'robert.drake@colorado.edu'
            },
            {
                name: 'Emma Frost',
                phone: '(555) 555-1112',
                email: 'emma.frost@colorado.edu'
            },
            {
                name: 'Doreen Green',
                phone: '(555) 555-1113',
                email: 'doreen.green@colorado.edu'
            },
            {
                name: 'Jean Grey',
                phone: '(555) 555-1114',
                email: 'jean.grey@colorado.edu'
            },
            {
                name: 'James Howlett',
                phone: '(555) 555-1115',
                email: 'james.howlett@colorado.edu'
            },
            {
                name: 'Ororo Munroe',
                phone: '(555) 555-1116',
                email: 'ororo.munroe@colorado.edu'
            },
            {
                name: 'Katherine Pryde',
                phone: '(555) 555-1117',
                email: 'katherine.pryde@colorado.edu'
            },
            {
                name: 'Piotr Rasputin',
                phone: '(555) 555-1118',
                email: 'piotr.rasputin@colorado.edu'
            },
            {
                name: 'Scott Summers',
                phone: '(555) 555-1119',
                email: 'scott.summers@colorado.edu'
            },
            {
                name: 'Kurt Wagner',
                phone: '(555) 555-1120',
                email: 'kurt.wagner@colorado.edu'
            },
            {
                name: 'Warren Worthington',
                phone: '(555) 555-1121',
                email: 'warren.worthington@colorado.edu'
            },
            {
                name: 'Charles Xavier',
                phone: '(555) 555-1122',
                email: 'charles.xavier@colorado.edu'
            }
        ]
    },
    action = {}
) => {
    switch (action.type) {
        case ADD_CONTACT:
            return { list: [action.contact, ...state.list] };
        default:
            return state;
    }
};

// Action Creators
export const addContact = contact => ({
    type: ADD_CONTACT,
    contact
});
