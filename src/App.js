import React, { useState, useEffect } from 'react';
import { json } from 'd3';
import Header from './components/Header';
import Footer from './components/Footer';
import Treemap from './components/Treemap';
import ErrorMessage from './components/Error-Message';
import LoadingSpinner from './components/Loading-Spinner';

const App = () => {
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [data, setData] = useState(null);
  const [colorData, setColorData] = useState([]);

  useEffect(() => {
    json('https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json').then(dataset => {
      setLoadingStatus(false);
      setData(dataset);
      setColorData([ ...renderColorData(dataset.children) ])
    }).catch(() => {
      setLoadingStatus(false);
      setData(null);
      setColorData([]);
    });
  }, []);

  function renderColorData(categories) {
    let array = categories.reduce((acc, child, i) => {
      acc.push(i * 20);
      return acc;
    }, []);
    array = shuffleArray(array);
    return array;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  return (
    <React.Fragment>
      <Header />
      <main>
        {loadingStatus && !data ? <LoadingSpinner /> : data ? <Treemap data={data} colorData={colorData} /> : <ErrorMessage />}
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default App;