export const ADD_PERSON = 'ADD_PERSON';
export const DELETE_PERSON = 'DELETE_PERSON';
export const UPDATE_PERSON = 'UPDATE_PERSON';
export const FILTER_PERSON = 'FILTER_PERSON';

export interface Person {

    first_name: string,
    last_name: string,
    date_of_birth: string,
    id: string,
}

export interface PersonState {

    persons: Person[]
}

export type ActionType = { type: typeof ADD_PERSON, person: Person } 
                       | { type: typeof DELETE_PERSON, personId: string }
                       | { type: typeof UPDATE_PERSON, person: Person }
                       | { type: typeof FILTER_PERSON, keywords: string }

