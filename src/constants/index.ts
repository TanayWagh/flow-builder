/**
 * @author Tanay Wagh <tanay.wagh@314ecorp.com>
 * @description App related constants
 */

import { MessageOutlined } from '@ant-design/icons';

import MessageNode from '../components/nodes/message/MessageNode';
import VoiceMessageNode from '../components/nodes/voice-message/VoiceMessageNode';

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
	message: { name: 'Message', Icon: MessageOutlined, node: MessageNode, defaultVal: 'New Message Node' },
	voice: { name: 'Voice', Icon: MessageOutlined, node: VoiceMessageNode, defaultVal: null },
};

// This code defines an object of different node types.
// Currently we are supporting two type of nodes 1) Message 2) Voice
// Each node type has the following properties:
//   name: The name of the node type.
//   Icon: The icon for the node type.
//   node: React functional component for node.
//   defaultVal: The default value for the node type.

export { initialEdges, initialNodes, nodeTypes };
