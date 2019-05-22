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
    const setColor = d3.scaleOrdinal()
      .domain(dataset.children)
      .range([0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270]);

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
      .data(treemap(root).leaves())
      .enter()
      .append('g')
      .attr('transform', d => `translate(${d.x0}, ${d.y0})`);

    tile.append('rect')
      .attr('class', 'tile')
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .attr('fill', d => `hsl(${setColor(d.parent.data.name)}, 98%, 80%)`)
      .on('mouseover', handleMouseover)
      .on('mouseout', handleMouseout);

    function handleMouseover(d) {
      const tooltip = d3.select('.treemap')
        .append('div')
        .attr('class', 'tooltip')
        .style('visibility', 'hidden');

      tooltip.transition()
        .duration(200)
        .style('visibility', 'visible');

      tooltip.html(`${d.data.name}<br/>${d.data.category}<br/>${d.data.value}`)
        .style('left', `${d3.event.pageX - 50}px`)
        .style('top', `${d3.event.pageY - 100}px`);
    }

    function handleMouseout() {
      d3.select('.tooltip').remove();
    }

    const legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', 'translate(150, 0)');

    const orderedCategories = dataset.children.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

    const legendCategories = legend.selectAll('g')
      .data(orderedCategories)
      .enter()
      .append('g');

    legendCategories.append('rect')
      .attr('class', 'legend-item')
      .attr('x', (d, i) => i * 60 - 100)
      .attr('y', 20)
      .attr('width', 15)
      .attr('height', 15)
      .attr('fill', d => `hsl(${setColor(d.name)}, 98%, 80%)`);

    legendCategories.append('text')
      .attr('x', (d, i) => i * 60 - 100)
      .attr('y', 55)
      .attr('fill', '#fff')
      .text(d => d.name);
  }).catch(err => {
    document.querySelector('.error-message').style.display = 'block';
  });
}

displayTreemap();
