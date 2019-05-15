function displayTreemap() {
  d3.json('https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json').then(dataset => {
  }).catch(err => {
  });
}

displayTreemap();
