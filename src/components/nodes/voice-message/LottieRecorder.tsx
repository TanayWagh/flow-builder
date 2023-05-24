/**
 * @author Tanay Wagh <tanay.wagh@314ecorp.com>
 * @description Lottie Recorder
 */

import React, { CSSProperties } from 'react';

import Lottie from 'react-lottie-player';
import Recorder from './Recorder.json';

interface IProps {
	play: boolean;
	style?: CSSProperties;
}

const defaultOptions = {
	loop: true,
	play: true,
	animationData: Recorder,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice',
	},
	style: { width: '200px', height: '40px' },
};

const LottieRecorder: React.FC<IProps> = (props) => {
	return <Lottie {...defaultOptions} {...props} />;
};

export default LottieRecorder;
