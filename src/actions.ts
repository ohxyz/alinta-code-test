import { 
    Person, 
    ADD_PERSON, 
    DELETE_PERSON,
    UPDATE_PERSON,
    FILTER_PERSON,
    ActionType } from './interfaces';

export function addPerson( person: Person ): ActionType {

    return {

        type: ADD_PERSON,
        person: person
    }
}

export function deletePerson( personId: string ): ActionType {

    return {

        type: DELETE_PERSON,
        personId: personId
    }
}

export function updatePerson( person: Person ): ActionType {

    return {

        type: UPDATE_PERSON,
        person: person
    }
}

export function filterPerson( keywords: string ): ActionType {

    return {

        type: FILTER_PERSON,
        keywords: keywords
    }
}
