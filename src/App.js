import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

const url = [
  {
    url: "http://quotes.stormconsultancy.co.uk/random.json",
    author: ""
  },
  {
    url: "https://api.quotable.io/random",
    author: "",
  },
  {
    url: "https://api.whatdoestrumpthink.com/api/v1/quotes/random",
  },
  { url: "https://ron-swanson-quotes.herokuapp.com/v2/quotes", }
];

const App = () => {
  const [quote, setQuote] = useState({});

  useEffect(() => {
    getQuotes();
  }, [])
  const getQuotes = () => {
    const randomIndex = Math.floor(Math.random() * url.length);
    const item = url[randomIndex];
    let data = {};
    axios.get(item.url)
      .then(response => {
        const responseData = response.data;
          data = {
            quote: responseData.content || responseData.quote || responseData.message || responseData,
            author: responseData.author || "Unknown"
          }
        setQuote(data);
      })
      .catch(() => {
        data = {
          quote: "Ops! Something went wrong please try again"
        }
        setQuote(data);
      });
  }

  return (
    <header className="masthead">
      <div className="container container-height d-flex align-items-center">
        <div className="mx-auto text-center div-height">
          <h3 className="text-center title mx-auto my-0 text-uppercase">Get Random Quotes</h3>
          <h1 className="mx-auto my-0 text-uppercase">Author:<br/>{quote.author}</h1>
          <h2 className="text-white-50 mx-auto mt-2 mb-5">{quote.quote}</h2>
          <button className="btn btn-primary js-scroll-trigger" onClick={() => getQuotes()}>Get Quote</button>
        </div>
      </div>
    </header>
  );
}

export default App;
