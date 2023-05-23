/**
 * @author Tanay Wagh <tanay.wagh@314ecorp.com>
 * @description Nodes Panel
 */

import React from 'react';

import NodesPanel, { INodePanelProps } from './NodesPanel';
import SettingsPanel from './SettingsPanel';

interface IProps extends INodePanelProps {
	isNodeSelected: boolean;
	value: string;
	onChange: (value: string) => void;
}

const Panel: React.FC<IProps> = (props) => {
	const { isNodeSelected, nodes, ...restProps } = props;

	return (
		<div className='panel'>
			{props.isNodeSelected ? <SettingsPanel {...restProps} /> : <NodesPanel nodes={nodes} />}
		</div>
	);
};

export default Panel;
