/**
 * @author Tanay Wagh <tanay.wagh@314ecorp.com>
 * @description Page Header component
 */

import React from 'react';
import { Button, ButtonProps } from 'antd';

const PageHeader: React.FC<ButtonProps> = (props) => {
	return (
		<div className='header'>
			<Button {...props}>Save Changes</Button>
		</div>
	);
};

export default PageHeader;
