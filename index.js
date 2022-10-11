const express = require('express')
let persons = require('./persons.js')
const morgan = require('morgan')


const app = express()

const {containsName,getId} = require('./utilities.js')

app.use(express.json())

app.use(express.static('build'))

morgan.token('post-body',(req,res)=>{
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] :response-time ms :post-body'))



app.get('/api/persons',(req,res)=>{
    res.json(persons)
})

app.get('/api/persons/:id',(req,res)=>{
    const id = Number(req.params.id)
    console.log(id)
    const person = persons.find(person=>person.id===id)
    if(!person) return res.status(400).end()
    res.status(200).json(person)
})

app.get('/info',(req,res)=>{
    const dateTime = new Date().toString()
    const content = `<p>Phonebook has info for ${persons.length} people</p>
                    <p>${dateTime}</p>`
    res.type('html')
    res.status(200).send(content)
})

app.delete('/api/persons/:id',(req,res)=>{
    const id = Number(req.params.id)
    console.log(id)
    const person = persons.find(person=>person.id===id)
    if(!person) return res.status(400).end()
    persons = persons.filter(person=>person.id!==id)
    res.status(200).end()
})

app.post('/api/persons',(req,res)=>{
    const {name,number} = req.body
    if(!name || !number) return res.status(400).json({
        error: 'content missing'
    })

    if(containsName(name,persons)){
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {name,number, id: getId()}
    persons = [...persons,{...person}]

    res.status(200).json(person)

})


const PORT = process.env.PORT || 3001
app.listen(PORT,()=>console.log(`server now listening on ${PORT}`))