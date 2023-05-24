/**
 * @author Tanay Wagh <tanay.wagh@314ecorp.com>
 * @description App related constants
 */

import { MessageOutlined } from '@ant-design/icons';

import MessageNode from '../components/nodes/MessageNode';

const initialNodes = [
	{
		id: 'node-1',
		position: { x: 50, y: 100 },
		data: { value: 'Text message 1' },
		type: 'message',
	},
	{
		id: 'node-2',
		type: 'message',
		position: { x: 50, y: 400 },
		data: { value: 'Text message 2' },
	},
	{
		id: 'node-3',
		type: 'message',
		position: { x: 500, y: 200 },
		data: { value: 'Text message 3' },
	},
];

const initialEdges = [
	{ id: 'edge-1', source: 'node-1', target: 'node-3', sourceHandle: 'a' },
	{ id: 'edge-2', source: 'node-2', target: 'node-3', sourceHandle: 'b' },
];

const nodeTypes = {
	message: { name: 'Message', Icon: MessageOutlined, node: MessageNode },
	voice: { name: 'Voice', Icon: MessageOutlined, node: MessageNode },
};

export { initialEdges, initialNodes, nodeTypes };
