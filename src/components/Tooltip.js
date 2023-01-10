import React from 'react';

const Tooltip = ({ tooltip }) => {
  return <div className="tooltip" style={{ top: tooltip.top, left: tooltip.left }}><strong>Game:</strong> {tooltip.name}<br /><strong>Platform:</strong> {tooltip.category}<br /><strong>Value:</strong> {tooltip.value}</div>;
}

export default Tooltip;