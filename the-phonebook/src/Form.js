function Form({handleNameChange,handleNumberChange,handleSubmit}){
    return (
        <form>
            <div>
                name: <input onChange={handleNameChange}/>
            </div>
            <div>
                number: <input onChange={handleNumberChange}/>
            </div>
            <div>
                <button
                    type="submit"
                    onClick={handleSubmit}
                >add</button>
            </div>
        </form>


    )
}


export default Form