/**
 * @author Tanay Wagh <tanay.wagh@314ecorp.com>
 * @description Page Header component
 */

import React from 'react';
import { Button } from 'antd';

const PageHeader: React.FC = () => {
	const handleSave = () => {
		return;
	};

	return (
		<div className='header'>
			<Button onClick={handleSave}>Save Changes</Button>
		</div>
	);
};

export default PageHeader;
