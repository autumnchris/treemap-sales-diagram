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

    const treemap = d3.treemap()
      .size([w - margin.left - margin.right, h - margin.top - margin.bottom])
      .padding(2);

    const chart = svg.append('g')
      .attr('class', 'chart')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const root = d3.hierarchy(dataset)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);

    treemap(root);

    const tile = chart.selectAll('g')
      .data(root.leaves())
      .enter()
      .append('g')
      .attr('transform', d => `translate(${d.x0}, ${d.y0})`);

    tile.append('rect')
      .attr('class', 'tile')
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0);
  }).catch(err => {
    document.querySelector('.error-message').style.display = 'block';
  });
}

displayTreemap();
