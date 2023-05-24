/**
 * @author Tanay Wagh <tanay.wagh@314ecorp.com>
 * @description Nodes Panel
 */

import React from 'react';
import _ from 'lodash';
import { Node } from 'reactflow';

import NodesPanel, { INodePanelProps } from './NodesPanel';
import SettingsPanel from './SettingsPanel';

interface IProps extends INodePanelProps {
	selectedNode?: Node;
	onChange: (modifiedNode: Node) => void;
	onNodeAdd: (x: number, y: number, nodeType: string) => void;
}

const Panel: React.FC<IProps> = (props) => {
	const { selectedNode, nodes, onNodeAdd, onChange } = props;

	const handleChange = (value: string) => {
		if (selectedNode) {
			onChange({ ...selectedNode, data: { ...selectedNode.data, value } });
		}
	};

	return (
		<div className='panel'>
			{selectedNode ? (
				<SettingsPanel value={_.get(selectedNode, ['data', 'value'])} onChange={handleChange} />
			) : (
				<NodesPanel nodes={nodes} onNodeAdd={onNodeAdd} />
			)}
		</div>
	);
};

export default Panel;
