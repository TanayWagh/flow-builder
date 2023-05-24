/**
 * @author Tanay Wagh <tanay.wagh@314ecorp.com>
 * @description Settings Panel
 */

import React, { useEffect, useState } from 'react';
import { Input, Card } from 'antd';
import VoiceRecordingNode from '../nodes/voice-message/VoiceRecorder';

interface IProps {
	value: string | Blob;
	type?: string;
	onChange: (value: string | Blob) => void;
}

const SettingsPanel: React.FC<IProps> = (props) => {
	const [value, setValue] = useState<string | Blob>('');

	useEffect(() => {
		setValue(props.value);
	}, [props.value]);

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setValue(e.target.value);
		props.onChange(e.target.value);
	};

	const handleRecordingComplete = (blob: Blob) => {
		props.onChange(blob);
	};

	if (value instanceof Blob || props.type === 'voice') {
		return <VoiceRecordingNode onComplete={handleRecordingComplete} />;
	}

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
