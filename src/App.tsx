import React from 'react';
import { DataTable } from './table';
import { rootReducer } from './reducers';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { PersonState } from './interfaces';
import { addPerson, deletePerson, updatePerson, filterPerson } from './actions';

const store = createStore( rootReducer );

const mapStateToProps = ( state: PersonState ) => {

    return { persons: state.persons }
};

const dispatchProps = {

    deletePerson,
    addPerson,
    updatePerson,
    filterPerson
};

const ConnectedDataTable = connect( mapStateToProps, dispatchProps )( DataTable );

const App: React.FC = () => {

    return  <Provider store={store}>
                <ConnectedDataTable />
            </Provider>

};

export default App;
