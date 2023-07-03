
import '../styles/App.scss';
import { useState,useEffect, } from 'react';
//import data from '../data/data.json';

function App() {
  const [phrasesList, setPharsesList] = useState([]);
  const [phraseSearch, setPhraseSearch] = useState('');
  const [selectCharacter, setSelectCharacter] = useState('');
  const [newElement, setNewElement] = useState (
    {phrase: '',
    character: ''}
  );
   let characters = [];
  //// fetch a la api
  useEffect(()=> {
    fetch('https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json')
      .then(reponse => reponse.json())
      .then(data => {
        const dataList = data.map((eachPhrase)=> {
          return {
            //generar id unico
            id: crypto.randomUUID(),
            phrase: eachPhrase.quote,
            character: eachPhrase.character
          }
        })
        setPharsesList(dataList);
        console.log(dataList);
      });
  }, []);

  ///funciones handle
  const handleInputSearch = (ev) => {
    setPhraseSearch(ev.target.value);
  };

  const handleSelectCharacter = (ev) => {
    setSelectCharacter(ev.target.value);
  };

  const handleInputNew = (ev) => {
    setNewElement({...newElement, [ev.target.name]: ev.target.value});
  };

  const handleClick = (ev) => {
    ev.preventDefault();
    setPharsesList([...phrasesList,newElement]);
    setNewElement({
      phrase:'',
      character: '',
    });
  };
 

  ///render list
  const renderListFriends = () => {
    //filtrar frase//siempre antes de mapear
    const filteredList= phrasesList.filter ((eachPhrase)=>
    eachPhrase.phrase.toLowerCase().includes(phraseSearch.toLowerCase())  
    );

    //los personajes del select salen repetido- crear nueva lista
    const characters = [...new Set(filteredList.map((eachPhrase)=> eachPhrase.character))];

    //filtrar por personaje dentro del renderizado, para que se muestren los dos filtros
    const characterFilteredList = selectCharacter ==='' ? filteredList : filteredList.filter((eachPhrase)=> eachPhrase.character === selectCharacter);

    //1 render map, convertir array de datos en html
    return characterFilteredList.map((eachPhrase)=> 
    <li key={eachPhrase.id}>
      <p>{`${eachPhrase.phrase}, ${eachPhrase.character}`}</p>
    </li>
    )
  };


 

  return (
    <div className="App">
      <header className='header'>
        <h1>Frases de Friends</h1>
      </header>
      <main className='main'>
      <form className='form'>
        <label htmlFor="search">Filtrar por frase:</label>
        <input type="search" 
        name='search'
        value={phraseSearch}
        onInput={handleInputSearch}
        />
        <label htmlFor="character">Filtrar por personaje</label>
        <select name="character" id="characterSelect" onChange={handleSelectCharacter} >
          
          <option value="all">Todos</option>
          {characters.map((character) => (
          <option key={character} value={character}>
          {character}
            </option>
          ))}

        </select>

        <label htmlFor="newPhrase">Frase</label>
        <input type="text" 
        name='phrase' 
        value={newElement.phrase}   
        onInput={handleInputNew}   
        />
        <label htmlFor="newCharacter">Personaje</label>
        <input type="text" 
        name='character'
        value={newElement.character} 
        onInput={handleInputNew}   
        />
        <button onClick={handleClick}>Añadir</button>
        
      </form>
      </main>
      <ul className='list'>
        {renderListFriends()}
      </ul>
    </div>
  );
}

export default App;
