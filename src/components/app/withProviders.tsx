/**
 * @author Tanay Wagh <tanay.wagh@314ecorp.com>
 * @description Application providers
 */

import React from 'react';
import { ReactFlowProvider } from 'reactflow';

interface IProps {
	dom: HTMLElement;
}

const withProviders = (Component: React.JSXElementConstructor<IProps>): React.FC<IProps> => {
	const Providers: React.FC<IProps> = (props) => {
		return (
			<ReactFlowProvider>
				<Component {...props} />
			</ReactFlowProvider>
		);
	};

	return Providers;
};

export default withProviders;
