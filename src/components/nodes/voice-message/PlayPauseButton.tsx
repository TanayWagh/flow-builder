/**
 * @author Tanay Wagh <tanay.wagh@314ecorp.com>
 * @description Play pause button
 */

import React, { useMemo } from 'react';
import classnames from 'classnames';
import { Button } from 'antd';
import { LoadingOutlined, PauseCircleFilled, PlayCircleFilled } from '@ant-design/icons';

export type IType = 'play' | 'pause' | 'loading';

interface IProps {
	type: IType;
	onClick: () => void;
}

const PlayPauseButton: React.FC<IProps> = (props) => {
	const { type, ...restProps } = props;

	const { icon, title } = useMemo(() => {
		if (type === 'loading') {
			return { icon: <LoadingOutlined />, title: 'Loading' };
		} else if (type === 'play') {
			return { icon: <PauseCircleFilled />, title: 'Pause' };
		}
		return { icon: <PlayCircleFilled />, title: 'Play' };
	}, [type]);

	return (
		<Button
			type='text'
			className={classnames({ 'red-color': type === 'play' })}
			icon={icon}
			title={title}
			{...restProps}
		/>
	);
};

export default PlayPauseButton;
