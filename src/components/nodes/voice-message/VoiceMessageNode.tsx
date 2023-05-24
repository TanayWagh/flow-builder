/**
 * @author Tanay Wagh <tanay.wagh@314ecorp.com>
 * @description Custom Node to send voice message
 */

import React from 'react';
import _ from 'lodash';
import { Space } from 'antd';
import { Handle, Position, NodeProps } from 'reactflow';
import { AudioOutlined } from '@ant-design/icons';

import WhatsApp from '../../icons/WhatsApp';
import AudioPlayer from './AudioPlayer';

const VoiceMessageNode: React.FC<NodeProps> = (props) => {
	const { isConnectable, data } = props;
	const recording = _.get(data, 'value', '');

	return (
		<div className='message-node voice-node'>
			<Handle type='target' position={Position.Left} isConnectable={isConnectable} />
			<div className='node-header'>
				<Space>
					<AudioOutlined />
					<div>Send Audio</div>
				</Space>
				<WhatsApp />
			</div>
			{recording ? <AudioPlayer recording={recording} /> : <div className='content'>Click me to Record</div>}
			<Handle type='source' position={Position.Right} id='a' isConnectable={isConnectable} />
		</div>
	);
};

export default VoiceMessageNode;
