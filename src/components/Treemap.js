import React, { useState, useEffect } from 'react';
import { treemap, hierarchy, scaleOrdinal } from 'd3';
import Legend from './Legend';
import Tile from './Tile';
import Tooltip from './Tooltip';

const Treemap = ({ data, colorData }) => {
  const margin = {
    top: 80,
    right: 40,
    bottom: 80,
    left: 40
  };
  const w = 1200;
  const h = w * 0.5;
  const color = scaleOrdinal()
    .domain(data.children)
    .range(colorData);

  
  const [leaves, setLeaves] = useState([]);
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    drawTree();
  }, []);

  function drawTree() {
    const root = hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);
    const treemapRoot = treemap()
      .size([w - margin.left - margin.right, h - margin.top - margin.bottom])
      .padding(2);

    treemapRoot(root);
    setLeaves(treemapRoot(root).leaves());
  }

  function handleMouseEnter(event, value) {
    setTooltip({
      category: value.data.category,
      name: value.data.name,
      value: value.data.value,
      left: `${event.pageX - 50}px`,
      top: `${event.pageY - 90}px`
    });
  }

  function handleMouseLeave() {
    setTooltip(null);
  }

  return (
    <div className="treemap-container">
      <svg className="treemap" viewBox={`0 0 ${w} ${h}`} transform="translate(0, 20)">
        <Legend categories={data.children} color={color} />
        <g className="diagram" transform={`translate(${margin.left}, ${margin.top})`}>
          {leaves.map((leaf, i) => <Tile key={i} leaf={leaf} color={color} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />)}
        </g>
      </svg>
      {tooltip && <Tooltip tooltip={tooltip} />}
    </div>
  );
}

export default Treemap;