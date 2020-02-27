import React from 'react';
import './Palette.css';

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

const PaletteItem = ({ color, active, onSelect }) => {
	return (
		<div
			className={`PaletteItem ${active ? 'active' : ''}`}
			style={{ backgroundColor: color }}
			onClick={() => onSelect(color)}
		/>
	);
};

const Palette = ({ selected, onSelect }) => {
	return (
		<div className="Palette">
			<h2>색깔을 골라골라</h2>
			<div className="colors">
				{colors.map(color => (
					<PaletteItem
						color={color}
						key={color}
						active={selected === color}
						onSelect={onSelect}
					/>
				))}
			</div>
		</div>
	);
};

export default Palette;
