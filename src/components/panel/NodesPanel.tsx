/**
 * @author Tanay Wagh <tanay.wagh@314ecorp.com>
 * @description Nodes Panel
 */

import React from 'react';
import _ from 'lodash';

interface INode {
	name: string;
	Icon: React.FC;
	defaultVal: string | null;
}

export interface INodePanelProps {
	nodes: Record<string, INode>;
	onNodeAdd: (x: number, y: number, nodeType: string, defaultVal: string | null) => void;
}

const NodesPanel: React.FC<INodePanelProps> = (props) => {
	const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, key: string, defaultVal: string | null) => {
		const x = e.clientX;
		const y = e.clientY;
		if (x < (window.innerWidth * 18) / 24) {
			props.onNodeAdd(x, y, key, defaultVal);
		}
	};

	return (
		<div className='nodes-wrapper'>
			{_.map(props.nodes, ({ Icon, name, defaultVal }, key) => (
				<div
					key={key}
					draggable='true'
					className='custom-node'
					onDragEnd={(e) => handleMouseUp(e, key, defaultVal)}
				>
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
