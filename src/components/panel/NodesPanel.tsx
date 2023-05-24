/**
 * @author Tanay Wagh <tanay.wagh@314ecorp.com>
 * @description Nodes Panel
 */

import React from 'react';
import _ from 'lodash';

interface INode {
	name: string;
	Icon: React.FC;
}

export interface INodePanelProps {
	nodes: Record<string, INode>;
}

const NodesPanel: React.FC<INodePanelProps> = (props) => {
	// const closeDragElement = () => {
	// 	document.onmouseup = null;
	// 	document.onmousemove = null;
	// };

	// const elementDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
	// 	e = e || window.event;
	// 	e.preventDefault();
	// 	// calculate the new cursor position:
	// 	pos1 = pos3 - e.clientX;
	// 	pos2 = pos4 - e.clientY;
	// 	pos3 = e.clientX;
	// 	pos4 = e.clientY;
	// 	// set the element's new position:
	// 	elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
	// 	elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
	// };

	// const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
	// 	e.preventDefault();
	// 	const pos3 = e.clientX;
	// 	const pos4 = e.clientY;
	// 	document.onmouseup = closeDragElement;
	// 	// call a function whenever the cursor moves:
	// 	document.onmousemove =  elementDrag;
	// };

	return (
		<>
			{_.map(props.nodes, ({ Icon, name }, key) => (
				<div
					key={key}
					className='custom-node'
					//  onMouseDown={handleMouseDown}
				>
					<div>
						<Icon />
						<span>{name}</span>
					</div>
				</div>
			))}
		</>
	);
};

export default NodesPanel;
