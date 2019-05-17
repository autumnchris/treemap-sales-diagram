function displayTreemap() {
  const margin = {
    top: 80,
    right: 40,
    bottom: 80,
    left: 40
  };
  const w = 1200;
  const h = w * 0.5;

  d3.json('https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json').then(dataset => {
    const svg = d3.select('.treemap')
      .append('svg')
      .attr('viewBox', `0 0 ${w} ${h}`)
      .attr('transform', 'translate(0, 20)');
  }).catch(err => {
    document.querySelector('.error-message').style.display = 'block';
  });
}

displayTreemap();