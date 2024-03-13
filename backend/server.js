const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs').promises; //to read and write main.json
const path = require('path');

const app = express();
const PORT = 5000;

//we use different ports for FE and BE therefore due to cors policy:
app.use(cors());

const CACHE_FILE_PATH = path.join(__dirname, 'main.json');

async function fetchNewsData() {
  let data;
  try {
    //fetching data from main.json file.
    data = await fs.readFile(CACHE_FILE_PATH, 'utf-8');
    data = JSON.parse(data);
  } catch (error) {
    try {
        //fetching data from external api.
         //await to pause execution until api call is resolved.
      const response = await axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
          country: 'us',
          //NOTE : I AM REMOVING MY API KEY AFTER TESTING AND COMPLETION OF PROJECT
          apiKey: '//your api key',
        },
      });
      //IF NOT THEN WRITTING IN MAIN.JSON
      data = response.data.articles;
      await fs.writeFile(CACHE_FILE_PATH, JSON.stringify(data));
    } catch (error) {
      console.error('Error fetching news:', error);
      throw error;
    }
  }
  return data;
}

app.get('/api/news', async (req, res) => {
  try {
    const newsData = await fetchNewsData();
    //response in json formal for hybrid use of (api/news) for developers
    res.json(newsData);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
