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
	onNodeAdd: (x: number, y: number, nodeType: string) => void;
}

const NodesPanel: React.FC<INodePanelProps> = (props) => {
	const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, key: string) => {
		const x = e.clientX;
		const y = e.clientY;
		if (x < 1450) {
			props.onNodeAdd(x, y, key);
		}
	};

	return (
		<div className='nodes-wrapper'>
			{_.map(props.nodes, ({ Icon, name }, key) => (
				<div key={key} draggable='true' className='custom-node' onDragEnd={(e) => handleMouseUp(e, key)}>
					<div>
						<Icon />
						<span>{name}</span>
					</div>
				</div>
			))}
		</div>
	);
};

export default NodesPanel;
