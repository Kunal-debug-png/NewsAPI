import React, { useState, useEffect } from 'react';

function App() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/news') 
      .then(response => response.json())
      .then(data => {
        setNews(data.articles); 
      })
      .catch(error => {
        console.error('Error fetching news:', error);
      });
  }, []);

  // read more functionality. button color change when clicked
  const handleReadMoreClick = (event) => {
    event.target.style.color = 'red'; // change to red/
  };

  return (
    <div style={{ backgroundColor: '#f3f3f3', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div>
        <h1 style={{ textAlign: 'center' }}>Top Headlines</h1>
        <ul style={{ padding: 0, listStyleType: 'none' }}>
          {news.map((article, index) => (
            <li key={index} style={{ marginBottom: '20px', textAlign: 'center' }}>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a href={article.url} style={{ color: 'blue', textDecoration: 'none' }} onClick={handleReadMoreClick}>Read more</a>
              {index !== news.length - 1 && <hr style={{ margin: '20px 0' }} />} {/* Separator line */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
