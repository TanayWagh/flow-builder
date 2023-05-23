/**
 * @author Tanay Wagh <tanay.wagh@314ecorp.com>
 * @description
 */

import React, { useCallback, useState } from 'react';
import { Layout, Row, Col } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import ReactFlow, {
	applyEdgeChanges,
	applyNodeChanges,
	addEdge,
	NodeResizer,
	NodeToolbar,
	Node,
	Edge,
	Panel as FlowPanel,
	Connection,
	NodeChange,
	EdgeChange,
} from 'reactflow';

import MessageNode from '../nodes/MessageNode';
import PageHeader from './PageHeader';
import Panel from '../panel/Panel';

import '../../styles/style.css';
import 'reactflow/dist/style.css';

const initialNodes = [
	{
		id: 'node-1',
		position: { x: 0, y: 0 },
		data: { value: 123 },
		type: 'messageNode',
	},
	{
		id: 'node-2',
		type: 'messageNode',
		// targetPosition: 'top' as const,
		position: { x: 0, y: 200 },
		data: { label: 'node 2' },
	},
	{
		id: 'node-3',
		type: 'messageNode',
		// targetPosition: 'top' as const,
		position: { x: 200, y: 200 },
		data: { label: 'node 3' },
	},
];

const initialEdges = [
	{ id: 'edge-1', source: 'node-1', target: 'node-2', sourceHandle: 'a' },
	{ id: 'edge-2', source: 'node-1', target: 'node-3', sourceHandle: 'b' },
];

const allNodes = {
	message: { name: 'Message', Icon: MessageOutlined },
};

const nodeTypes = { messageNode: MessageNode };

const App: React.FC = () => {
	const [nodes, setNodes] = useState<Node[]>(initialNodes);
	const [edges, setEdges] = useState<Edge[]>(initialEdges);
	const [value, setValue] = useState('');

	const handleNodesChange = useCallback(
		(changes: NodeChange[]) => {
			setNodes((nds) => {
				return applyNodeChanges(changes, nds);
			});
		},
		[setNodes],
	);
	const handleEdgesChange = useCallback(
		(changes: EdgeChange[]) => {
			setEdges((eds) => {
				return applyEdgeChanges(changes, eds);
			});
		},
		[setEdges],
	);

	const handleConnect = useCallback(
		(params: Connection) => {
			setEdges((eds) => {
				return addEdge(params, eds);
			});
		},
		[setEdges],
	);

	return (
		<Layout>
			<PageHeader />
			<Row>
				<Col span={18}>
					<ReactFlow
						nodes={nodes}
						edges={edges}
						nodeTypes={nodeTypes}
						onNodesChange={handleNodesChange}
						onEdgesChange={handleEdgesChange}
						onConnect={handleConnect}
					>
						<FlowPanel children={<>Haha</>} position='bottom-right' />
						<NodeToolbar />
						<NodeResizer />
					</ReactFlow>
				</Col>
				<Col span={6}>
					<Panel nodes={allNodes} isNodeSelected={false} value={value} onChange={setValue} />
				</Col>
			</Row>
		</Layout>
	);
};

export default App;
