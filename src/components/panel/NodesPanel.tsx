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
		props.onNodeAdd(e.clientX, e.clientY, key);
		console.log(e);
	};

	return (
		<>
			{_.map(props.nodes, ({ Icon, name }, key) => (
				<div key={key} draggable='true' className='custom-node' onDragEnd={(e) => handleMouseUp(e, key)}>
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
