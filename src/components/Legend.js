import React from 'react';

const Legend = ({ categories, color }) => {
 const orderedCategories = categories.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

  return <g className="legend" transform="translate(150, 0)">{orderedCategories.map((category, i) => {
    return <React.Fragment key={i}>
      <rect className="legend-color" x={i * 60 - 100} y="20" width="15" height="15" fill={`hsl(${color(category.name)}, 98%, 85%)`}></rect>
      <text className="legend-label" x={i * 60 - 100} y="55" fill="hsl(0, 0%, 100%)">{category.name}</text>
    </React.Fragment>
  })}</g>;
}

export default Legend;