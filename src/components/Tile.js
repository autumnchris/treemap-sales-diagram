import React from 'react';

const Tile = ({ leaf, color, handleMouseEnter, handleMouseLeave }) => {
  return (
    <g className="tile-container" transform={`translate(${leaf.x0}, ${leaf.y0})`} onMouseEnter={(event) => handleMouseEnter(event, leaf)} onMouseLeave={() => {handleMouseLeave()}}>
      <rect className="tile" width={leaf.x1 - leaf.x0} height={leaf.y1 - leaf.y0} fill={`hsl(${color(leaf.data.category)}, 98%, 85%)`}></rect>
      <svg x="0" y="0" width={leaf.x1 - leaf.x0} height={leaf.y1 - leaf.y0}>
        <text className="tile-text" x="6" y="16">{leaf.data.name}</text>
      </svg>
    </g>
  );
}

export default Tile;