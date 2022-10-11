function Person({id,name,number,removePerson}){

    const handleDelete=(e)=>{
        e.preventDefault()
        const answer = window.confirm(`delete ${name} ?`)
        if(answer) removePerson(id)
    }

    return (
        <li>
            {name}{' '}{number}
        <button
        onClick={handleDelete}
        >
            delete
        </button>
        </li>
    )
}




function Persons({persons,filter,removePerson}){

    function match(subString,personName){
        subString=subString.toLowerCase()
        personName = personName.toLowerCase()
        return subString===personName.slice(0,subString.length)
    }

    const filteredPersons = persons.filter(({name})=>match(filter,name))

    return (
        <ul>
            {filteredPersons.map(({name,number,id})=>
               <Person key={id} {...{name,number,id,removePerson}}/>
            )}
        </ul>
    )
}

export default Persons