import React , { useState , useEffect } from 'react';
import NavigationBar from '../NavigationBar/NavigationBar.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
    
    const [selectState , setSelectState ] = useState("Random");
    const [searchState , setSearchState] = useState("");
    var [urlState , setUrlState] = useState("");
    var [animeState , setAnimeState] = useState([]);


    function handleSelectionChange(e){
        setSelectState(e.target.value);
    }

    function handleInputChange(e){
        setSearchState(e.target.value);
    }

    function handleClickChange(e) {
        e.preventDefault();


        setUrlState(urlState = "");
        setAnimeState(animeState = []);
        
        var url = "https://animechan.vercel.app/api/quotes";

        if(selectState === "Random" || searchState === ""){
            url = "https://animechan.vercel.app/api/quotes";
            
        }

        if(selectState !== "Random" && searchState === ""){
            alert("Please Fill The Entry");
            return ;
        }

        if(selectState === "Anime"){
            url = url + "/anime?title=" + String(searchState);
        }

        if(selectState === "Character Name"){
            url = url + "/character?name=" + String(searchState);
        }

        setUrlState(url);
    }

    
    useEffect(() => {
        if(urlState === ""){
            setUrlState("https://animechan.vercel.app/api/quotes");
        }

        fetch(urlState)
        .then((response) => response.json())
        .then(quotes => {
            if(!quotes.error){
                setAnimeState(quotes);
            }
            else{
                alert('No result found please try again');

            }
        })
        .catch((error) => console.log(error));
    } , [urlState])


    
    return (
        <div>
            <NavigationBar />
            <form className="form" onSubmit={handleClickChange} >
                <div className="form-content">
                    <label htmlFor="Option" className="input-group-text">Sort By : </label>
                </div>
                
                <div className="form-content">
                    <select name="anime" className="custom-select" onChange = {handleSelectionChange}>       
                        <option value="Random">Random</option>
                        <option value="Character Name">Character Name</option>
                        <option value="Anime">Anime</option>    
                    </select>
                </div>
                
                <div className="form-content">
                    <input type="text" className="form-control" placeholder="Type text" onChange={handleInputChange}/>
                </div>

                <div className="form-content">
                    <button type= "submit" className="btn btn-dark">Search</button>
                </div>
            </form>

            <br/>

            <section className="container">
                {
                    animeState.map((quote , key) => 
                        <div className="items" key = {key}>
                            <h4>Anime : {quote.anime}</h4>
                            <h6>Character : {quote.character}</h6>
                            <p>Quote : {quote.quote}</p>
                        </div>
                    )
                }
                
            </section>


            
            
            
        </div>
    )
}

export default App;
