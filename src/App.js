import { useEffect, useState } from "react";

const App = () => {
  // to know whether the API call has loaded or not
  const [loading, setLoading] = useState(true);
  // state to manage quote
  const [quote, setQuote] = useState("");
  // state to manage author
  const [author, setAuthor] = useState("");
  //  state to manage click of button
  const [newQuote, setNewQuote] = useState(false);
  async function randomQuote() {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    setAuthor(data.author);
    setQuote(data.content);
  }

  const handleNewQuoteClick = () => {
    setNewQuote(!newQuote);
  };

  useEffect(() => {
    randomQuote();
    setLoading(false);
  }, []);

  useEffect(() => {
    console.log(newQuote);
    randomQuote();
  }, [newQuote]);

  if (loading) {
    return <h2>Loading...</h2>;
  } else {
    return (
      <div>
        <p id="text">{quote}</p>
        <p id="author">{author}</p>
        <a
          id="tweet-quote"
          href={`https://twitter.com/intent/tweet?text="${quote}"%20${author}&hashtags=quotes`}
        >
          Tweet Quote
        </a>
        <button id="new-quote" onClick={handleNewQuoteClick}>
          New Quote
        </button>
      </div>
    );
  }
};

export default App;
