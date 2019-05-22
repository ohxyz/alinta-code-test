import {
    Person, 
    PersonState, 
    ActionType,
    ADD_PERSON,
    DELETE_PERSON,
    UPDATE_PERSON,
    FILTER_PERSON,
} from './interfaces';

let persons = require( './data.json' );

const initialState: PersonState = {

    persons: persons
};

export function rootReducer( state = initialState, action: ActionType ): PersonState {

    if ( action.type === DELETE_PERSON ) {

        persons = persons.filter( ( person: Person ) => person.id !== action.personId );

        return {

            persons: state.persons.filter( ( person: Person ) => person.id !== action.personId )
        };
    }
    else if ( action.type === ADD_PERSON ) {

        persons = [ ...persons, action.person ];

        return {

            persons: [ ...state.persons, action.person ]
        }
    }
    else if ( action.type === UPDATE_PERSON ) {

        return {

            persons: state.persons.map( ( person: Person ) => { 

                if ( person.id === action.person.id ) {

                    return action.person;
                }

                return person;
            } )
        }
    }
    else if ( action.type === FILTER_PERSON ) {

        return {

            persons: persons.filter( ( person: Person ) => {

                let keywords = action.keywords.toLowerCase();

                return person.first_name.toLowerCase().includes( keywords ) 
                            || person.last_name.toLowerCase().includes( keywords )

            } )
        }
    }
    else {

        return state;
    }
}