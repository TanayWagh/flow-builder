/**
 * @author Tanay Wagh <tanay.wagh@314ecorp.com>
 * @description Audio Player
 */

import React, { useMemo, useState, useRef, useEffect } from 'react';
import _ from 'lodash';

import LottieRecorder from './LottieRecorder';
import PlayPauseButton from './PlayPauseButton';

interface IProps {
	recording?: Blob;
}

export type IType = 'play' | 'pause' | 'loading';

const AudioPlayer: React.FC<IProps> = (props) => {
	const [type, setType] = useState<IType>('pause');
	const [currentTime, setCurrentTime] = useState(0);

	const ref = useRef<HTMLAudioElement>(null);

	useEffect(() => {
		const interval = setInterval(() => {
			const current = ref.current?.currentTime;

			if (current && !ref.current?.ended) {
				setCurrentTime(current);
			}
		}, 500);

		return () => {
			clearInterval(interval);
		};
	}, []);

	const url = useMemo(() => {
		if (props.recording) {
			return URL.createObjectURL(props.recording);
		}
	}, [props.recording]);

	const togglePlay = (newType: IType) => {
		setType(newType);
		if (newType === 'pause') {
			ref.current?.pause();
		} else {
			const playPromise = ref.current?.play();
			if (playPromise) {
				playPromise.then().catch(() => {
					void ref.current?.play();
				});
			}
		}
	};

	const handleClick = () => {
		togglePlay(type === 'pause' ? 'play' : 'pause');
	};

	const handleEnded = () => {
		setType('pause');
		setCurrentTime(0);
	};

	return (
		<div className='audio-player recorder' onClick={(e) => e.stopPropagation()}>
			<PlayPauseButton type={type} onClick={handleClick} />
			<LottieRecorder play={type === 'play'} style={{ width: '130px', height: '40px' }} />
			<span>
				{Math.floor(currentTime / 60)}:{_.toString(Math.floor(currentTime % 60)).padStart(2, '0')}
			</span>
			<audio controls={true} ref={ref} src={url} onEnded={handleEnded} />
		</div>
	);
};

export default AudioPlayer;
