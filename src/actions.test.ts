import * as actions from './actions';
import * as interfaces from './interfaces';

describe( 'Actions', () => { 

    it( 'Should create an action to add a person', () => {

        const person: interfaces.Person = { 

            id: '789',
            first_name: 'a',
            last_name: 'b',
            date_of_birth: '12/12/1212'
        }

        const expectedAction: interfaces.ActionType = {

            type: interfaces.ADD_PERSON,
            person
        }

        expect( actions.addPerson( person ) ).toEqual( expectedAction )

    } )
} )