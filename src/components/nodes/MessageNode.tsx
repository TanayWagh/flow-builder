/**
 * @author Tanay Wagh <tanay.wagh@314ecorp.com>
 * @description MessageNode
 */

import React from 'react';
import { Space, Tooltip } from 'antd';
import { Handle, Position } from 'reactflow';
import { MessageOutlined } from '@ant-design/icons';

import WhatsAppOutlined from '../icons/WhatsappFilled';

const MessageNode: React.FC<any> = ({ isConnectable }) => {
	const text = 'text message 1 heelo this is supposed to be a very simple message but long';

	return (
		<div className='message-node'>
			<Handle type='target' position={Position.Left} isConnectable={isConnectable} />

			<div className='node-header'>
				<Space>
					<MessageOutlined rev={undefined} />
					<div>Send Message</div>
				</Space>
				<WhatsAppOutlined />
			</div>
			<Tooltip placement='top' title={text}>
				<div className='content'>{text}</div>
			</Tooltip>

			<Handle type='source' position={Position.Right} id='a' isConnectable={isConnectable} />
		</div>
	);
};

export default MessageNode;
