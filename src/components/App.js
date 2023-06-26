
import '../styles/App.scss';
import { useState,useEffect } from 'react';
//import data from '../data/data.json';

function App() {
  const [phrasesList, setPharsesList] = useState([]);
  const [phraseSearch, setPhraseSearch] = useState('');

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

 

  ///render list
  const renderListFriends = () => {
    //filtrar frase
    const filteredList= phrasesList.filter ((eachPhrase)=>
    eachPhrase.phrase.toLowerCase().includes(phraseSearch.toLowerCase()) 
    
    );
    return filteredList.map((eachPhrase)=> 
    <li key={eachPhrase.id}>
      <p>{`${eachPhrase.phrase}, ${eachPhrase.character}`}</p>
    </li>
    )
  };

  return (
    <div className="App">
      <h1>Frases de Friends</h1>
      <form>
        <label htmlFor="search">Filtrar por frase:</label>
        <input type="search" 
        name='search'
        value={phraseSearch}
        onInput={handleInputSearch}
        />

    
      </form>
      <ul>
        {renderListFriends()}
      </ul>
    </div>
  );
}

export default App;
