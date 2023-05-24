/**
 * @author Tanay Wagh <tanay.wagh@314ecorp.com>
 * @description Custom node to send text message
 */

import React from 'react';
import _ from 'lodash';
import { Space, Tooltip } from 'antd';
import { Handle, Position, NodeProps } from 'reactflow';
import { MessageOutlined } from '@ant-design/icons';

import WhatsApp from '../../icons/WhatsApp';

const MessageNode: React.FC<NodeProps> = (props) => {
	const { isConnectable, data } = props;

	return (
		<div className='message-node'>
			<Handle type='target' position={Position.Left} isConnectable={isConnectable} />
			<div className='node-header'>
				<Space>
					<MessageOutlined />
					<div>Send Message</div>
				</Space>
				<WhatsApp />
			</div>
			<Tooltip placement='top' title={_.get(data, 'value', '')}>
				<div className='content'>{_.get(data, 'value', '')}</div>
			</Tooltip>
			<Handle type='source' position={Position.Right} id='a' isConnectable={isConnectable} />
		</div>
	);
};

export default MessageNode;
