/**
 * @author Tanay Wagh <tanay.wagh@314ecorp.com>
 * @description Nodes Panel
 */

import React from 'react';

import NodesPanel from './NodesPanel';
import SettingsPanel from './SettingsPanel';

interface IProps {
	isNodeSelected: boolean;
}

const Panel: React.FC<IProps> = (props) => {
	return <div className='panel'>{props.isNodeSelected ? <SettingsPanel /> : <NodesPanel />}</div>;
};

export default Panel;
