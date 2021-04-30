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
];

const App = () => {
  const [quote, setQuote] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getQuotes();
  }, [])
  const getQuotes = () => {
    setIsLoading(true);
    const randomIndex = Math.floor(Math.random() * url.length);
    const item = url[randomIndex];
    let data = {};
    axios.get(item.url)
      .then(response => {
        const responseData = response.data;
          data = {
            quote: responseData.content || responseData.quote,
            author: responseData.author || "Unknown"
          }
        setQuote(data);
        setIsLoading(false);
      })
      .catch(() => {
        data = {
          quote: "Ops! Something went wrong please try again"
        }
        setQuote(data);
        setIsLoading(false);
      });
  }

  const btnText = isLoading ? "Loading..." : "Get Quote";

  return (
    <header className="masthead">
      <div className="container container-height d-flex align-items-center">
        <div className="mx-auto text-center div-height">
          <h3 className="text-center title mx-auto my-0 text-uppercase">Get Random Quotes</h3>
          <h5 className="mx-auto my-0 text-uppercase">Author:</h5>
          <h1 className="mx-auto my-0 text-uppercase">{quote.author}</h1>
          <h2 className="text-white-50 mx-auto mt-2 mb-5">{quote.quote}</h2>
          <button className="btn btn-primary js-scroll-trigger" onClick={() => getQuotes()}>{btnText}</button>
        </div>
      </div>
    </header>
  );
}

export default App;
