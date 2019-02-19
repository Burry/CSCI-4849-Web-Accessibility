import robertDrake from '../../contact-photos/robert-drake.png';
import emmaFrost from '../../contact-photos/emma-frost.png';
import jeanGrey from '../../contact-photos/jean-grey.png';
import jamesHowlett from '../../contact-photos/james-howlett.png';
import ororoMunroe from '../../contact-photos/ororo-munroe.png';
import katherinePryde from '../../contact-photos/katherine-pryde.png';
import piotrRasputin from '../../contact-photos/piotr-rasputin.png';
import scottSummers from '../../contact-photos/scott-summers.png';
import kurtWagner from '../../contact-photos/kurt-wagner.png';
import warrenWorthington from '../../contact-photos/warren-worthington.png';
import charlesXavier from '../../contact-photos/charles-xavier.png';

// Action Types
const ADD_CONTACT = 'phone/contacts/ADD_CONTACT';

// Reducer
export default (
    state = {
        list: [
            {
                name: 'Robert Drake',
                phone: '(555) 555-1111',
                email: 'robert.drake@xmen.com',
                photo: robertDrake
            },
            {
                name: 'Emma Frost',
                phone: '(555) 555-1112',
                email: 'emma.frost@xmen.com',
                photo: emmaFrost
            },
            {
                name: 'Jean Grey',
                phone: '(555) 555-1114',
                email: 'jean.grey@xmen.com',
                photo: jeanGrey
            },
            {
                name: 'James Howlett',
                phone: '(555) 555-1115',
                email: 'james.howlett@xmen.com',
                photo: jamesHowlett
            },
            {
                name: 'Ororo Munroe',
                phone: '(555) 555-1116',
                email: 'ororo.munroe@xmen.com',
                photo: ororoMunroe
            },
            {
                name: 'Katherine Pryde',
                phone: '(555) 555-1117',
                email: 'katherine.pryde@xmen.com',
                photo: katherinePryde
            },
            {
                name: 'Piotr Rasputin',
                phone: '(555) 555-1118',
                email: 'piotr.rasputin@xmen.com',
                photo: piotrRasputin
            },
            {
                name: 'Scott Summers',
                phone: '(555) 555-1119',
                email: 'scott.summers@xmen.com',
                photo: scottSummers
            },
            {
                name: 'Kurt Wagner',
                phone: '(555) 555-1120',
                email: 'kurt.wagner@xmen.com',
                photo: kurtWagner
            },
            {
                name: 'Warren Worthington',
                phone: '(555) 555-1121',
                email: 'warren.worthington@xmen.com',
                photo: warrenWorthington
            },
            {
                name: 'Charles Xavier',
                phone: '(555) 555-1122',
                email: 'charles.xavier@xmen.com',
                photo: charlesXavier
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
