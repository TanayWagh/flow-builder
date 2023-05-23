/**
 * @author Tanay Wagh <tanay.wagh@314ecorp.com>
 * @description Settings Panel
 */

import React, { useState } from 'react';
import { Input, Card } from 'antd';

interface IProps {
	value: string;
	onChange: (value: string) => void;
}

const SettingsPanel: React.FC<IProps> = (props) => {
	const [value, setValue] = useState(props.value ?? '');

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setValue(e.target.value);
		props.onChange(e.target.value);
	};

	return (
		<Card className='settings-panel' title='Message' bordered={false}>
			<div>
				<span>Text</span>
			</div>
			<Input.TextArea value={value} onChange={handleChange} />
		</Card>
	);
};

export default SettingsPanel;
