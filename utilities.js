function containsName(newPerson,persons){
    persons = persons.map(person=>person.name.toLowerCase())
    newPerson = newPerson.toLowerCase()
    return Boolean(persons.indexOf(newPerson) !==-1)
}

// const persons = require('./persons.js')
// console.log(containsName('gregor',persons))
// console.log(containsName('arto hellas',persons))

function getId(){
    return Math.floor(Math.random()*10e7)
}

// console.log(getId())

module.exports = {containsName,getId}

