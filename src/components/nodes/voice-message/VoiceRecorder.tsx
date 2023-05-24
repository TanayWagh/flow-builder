/**
 * @author Tanay Wagh <tanay.wagh@314ecorp.com>
 * @description Voice recorder to record the user's voice
 */

import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Button, Divider, message } from 'antd';
import { DeleteFilled, AudioFilled, CheckCircleOutlined } from '@ant-design/icons';
import { useAudioRecorder } from 'react-audio-voice-recorder';

import LottieRecorder from './LottieRecorder';
import PlayPauseButton from './PlayPauseButton';

interface IProps {
	onComplete: (blob: Blob) => void;
}

const VoiceRecorder: React.FC<IProps> = (props) => {
	const [deleteRecording, setDeleteRecording] = useState(false);

	const recorderControls = useAudioRecorder({ echoCancellation: true }, () => {
		message.error('Please provide audio recording permissions from your browsers');
	});

	const { isRecording, isPaused, recordingTime, recordingBlob, togglePauseResume, startRecording, stopRecording } =
		recorderControls;

	useEffect(() => {
		if (recordingBlob && !deleteRecording) {
			const downloadBlob = new Blob([recordingBlob], {
				type: 'audio/wav',
			});
			props.onComplete(downloadBlob);
		}
		setDeleteRecording(false);
	}, [recordingBlob]);

	const handleDelete = () => {
		setDeleteRecording(true);
		stopRecording();
	};

	const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		startRecording();
		e.stopPropagation();
	};

	const content = isRecording ? (
		<>
			<div className='recorder'>
				<Button type='text' icon={<DeleteFilled />} title='Delete recording' onClick={handleDelete} />
				<Divider type='vertical' />
				<span>
					{Math.floor(recordingTime / 60)}:{_.toString(recordingTime % 60).padStart(2, '0')}
				</span>
				<LottieRecorder play={isRecording && !isPaused} />
				<PlayPauseButton type={isPaused ? 'pause' : 'play'} onClick={togglePauseResume} />
				<Divider type='vertical' />
			</div>
			<Button icon={<CheckCircleOutlined />} title='Save recording' onClick={stopRecording}>
				Click me to save
			</Button>
		</>
	) : (
		<Button icon={<AudioFilled />} title='Start recording' onClick={handleClick}>
			Click me to record
		</Button>
	);

	return <div className='voice-recorder'>{content}</div>;
};

export default VoiceRecorder;
