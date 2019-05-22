import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';
import { Person } from './interfaces';

const Table = styled.div``

const HeadRow = styled.div`

    display: flex;
`;

const HeadCell = styled.span`

    font-weight: bold;
    flex-basis: 25%;
    background-color: #eeeeee;
`;

const BodyRow = styled.div`

    display: flex;

    &:nth-child(2n-1) {

        background-color: #f5f5f5;
    }
`;

const Cell = styled.span`
    
    flex-basis: 25%;
`;

const Input = styled.input`
    width: 100%;
    box-sizing: border-box;
`;

const Button = styled.button``;

const FootRow = styled.div`

    display: flex;
`;

const Search = styled.input`
    margin-bottom: 5px;
`;

interface BodyRowProps {

    isEditMode: Boolean,
    person: Person,
    onCancelClick?: () => void,
    onEditClick?: () => void,
    onDeleteClick?: () => void,
    onSaveClick?: () => void,
    onInputChange?: ( event: SyntheticEvent ) => void,
}

const BodyRowCells: React.FC<BodyRowProps> = ( props: BodyRowProps ) => {

    return  props.isEditMode

            ?   <>  
                    <Cell>
                        <Input type="text" 
                               name="first-name" 
                               defaultValue={ props.person.first_name } 
                               onChange={ props.onInputChange } 
                        />
                    </Cell>
                    <Cell>
                        <Input type="text"
                               name="last-name"
                               defaultValue={ props.person.last_name } 
                               onChange={ props.onInputChange } 
                        />
                    </Cell>
                    <Cell>
                        <Input type="text"
                               name="dob"
                               defaultValue={ props.person.date_of_birth } 
                               onChange={ props.onInputChange } 
                        />
                    </Cell>
                    <Cell>
                        <Button onClick={ props.onSaveClick } >Save</Button>
                        <Button onClick={ props.onCancelClick } >Cancel</Button>
                    </Cell>
                </>

            :   <>
                    <Cell>{ props.person.first_name }</Cell>
                    <Cell>{ props.person.last_name }</Cell>
                    <Cell>{ props.person.date_of_birth }</Cell>
                    <Cell>
                        <Button onClick={ props.onEditClick } >Edit</Button>
                        <Button onClick={ props.onDeleteClick} >Delete</Button>
                    </Cell>
                </>
}

interface DataTableProps {

    persons: Array<Person>,
    deletePerson: ( personId: string ) => void,
    addPerson: ( person: Person ) => void,
    updatePerson: ( person: Person ) => void,
    filterPerson: ( keywords: string ) => void
}

type DataTableState = {

    indexOfRowEdit: number,
    shouldAddRow: boolean,
}

export class DataTable extends React.Component<DataTableProps, DataTableState> {

    readonly state: DataTableState = {
        
        indexOfRowEdit: -1,
        shouldAddRow: false,
    };

    person: Person = { id: '', first_name: '', last_name: '', date_of_birth: '' };

    handleEditClick = ( index: number, person: Person ) => {

        this.person = person;
        this.setState( { indexOfRowEdit: index, shouldAddRow: false } );
    }

    handleCancelClick = ( index: number ) => {

        this.setState( { indexOfRowEdit: -1 } );
    }

    handleAddClick = () => {

        this.setState( { shouldAddRow: true, indexOfRowEdit: -1 } );
    }

    handleDeleteClick = ( personId: string ) => {

        this.props.deletePerson( personId )
    }

    handleNewRowCancelClick = () => {

        this.setState( { shouldAddRow: false } );
    }

    handleInputChange = ( event: SyntheticEvent ) => {

        const target = event.target as HTMLInputElement;
        const name = target.name;
        const value = target.value;

        if ( name === 'first-name' ) {

            this.person.first_name = value;
        }
        else if ( name === 'last-name' ) {

            this.person.last_name = value;
        }
        else if ( name === 'dob' ) {

            this.person.date_of_birth = value;
        }
    }

    handleSaveClick = () => {

        if ( this.person.id === '' ) {

            this.person.id = Math.random().toString();
            this.props.addPerson( this.person );

            this.setState( { 

                shouldAddRow: false
            } )
        }
        else {

            this.props.updatePerson( this.person )
            this.setState( { 

                indexOfRowEdit: -1
            } )
        }

        this.person = { id: '', first_name: '', last_name: '', date_of_birth: '' }
    }

    handleSearchChange = ( event: SyntheticEvent ) => {

        const target = event.target as HTMLInputElement;

        this.props.filterPerson( target.value );
    }

    render() {

        const { persons } = this.props;

        return  <Table>
                    <HeadRow>
                        <Search type="text" 
                                placeholder="Search by name" 
                                onChange={ this.handleSearchChange } 
                        />
                    </HeadRow>
                    <HeadRow>
                        <HeadCell>First Name</HeadCell>
                        <HeadCell>Last Name</HeadCell>
                        <HeadCell>Date of Birth</HeadCell>
                        <HeadCell></HeadCell>
                    </HeadRow>
                    {
                        persons.map( ( person: Person, index: number ) => 

                            <BodyRow key={index}>
                                <BodyRowCells 
                                    person={person} 
                                    isEditMode={ index === this.state.indexOfRowEdit ? true : false } 
                                    onEditClick={ () => { this.handleEditClick(index, person) } }
                                    onCancelClick={ () => { this.handleCancelClick(index) } }
                                    onDeleteClick={ () => { this.handleDeleteClick(person.id) } }
                                    onSaveClick={ this.handleSaveClick }
                                    onInputChange={ this.handleInputChange }
                                />
                            </BodyRow>
                        )
                    }
                    { this.state.shouldAddRow &&

                        <BodyRow>
                            <BodyRowCells 
                                person={ { first_name: '', last_name: '', date_of_birth: '', id: '' } } 
                                isEditMode={ true } 
                                onCancelClick={ this.handleNewRowCancelClick }
                                onInputChange={ this.handleInputChange }
                                onSaveClick={ this.handleSaveClick }
                            />
                        </BodyRow>
                    }
                    <FootRow>
                        <Button onClick={ this.handleAddClick }>Add a Row</Button>
                    </FootRow>
                </Table>
    }  
}

