/**
 * @author Tanay Wagh <tanay.wagh@314ecorp.com>
 * @description Application providers
 */

import React from 'react';
import { ReactFlowProvider } from 'reactflow';

const withProviders = (Component: React.FC): React.FC => {
	const Providers: React.FC = () => {
		return (
			<ReactFlowProvider>
				<Component />
			</ReactFlowProvider>
		);
	};

	return Providers;
};

export default withProviders;
