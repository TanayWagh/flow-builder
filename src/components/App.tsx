/**
 * @author Tanay Wagh <tanay.wagh@314ecorp.com>
 * @description
 */

import React, { useCallback } from 'react';
import { Layout, Row, Col } from 'antd';
import ReactFlow, {
	useNodesState,
	useEdgesState,
	addEdge,
	NodeResizer,
	NodeToolbar,
	Panel as FlowPanel,
	Connection,
} from 'reactflow';

import '../styles/style.css';
import 'reactflow/dist/style.css';
import PageHeader from './PageHeader';
import Panel from './Panel';
import TextUpdater from '../TextUpdater';

const initialNodes = [
	{
		id: 'node-1',
		type: 'textUpdater',
		position: { x: 0, y: 0 },
		data: { value: 123 },
	},
	{
		id: 'node-2',
		type: 'output',
		targetPosition: 'top',
		position: { x: 0, y: 200 },
		data: { label: 'node 2' },
	},
	{
		id: 'node-3',
		type: 'output',
		targetPosition: 'top',
		position: { x: 200, y: 200 },
		data: { label: 'node 3' },
	},
];

const initialEdges = [
	{ id: 'edge-1', source: 'node-1', target: 'node-2', sourceHandle: 'a' },
	{ id: 'edge-2', source: 'node-1', target: 'node-3', sourceHandle: 'b' },
];

const nodeTypes = { textUpdater: TextUpdater };

const App: React.FC = () => {
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

	const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

	return (
		<Layout>
			<PageHeader />
			<Row>
				<Col span={16}>
					<ReactFlow
						nodes={nodes}
						edges={edges}
						nodeTypes={nodeTypes}
						onNodesChange={onNodesChange}
						onEdgesChange={onEdgesChange}
						onConnect={onConnect}
					>
						<FlowPanel children={<>Haha</>} position='bottom-right' />
						<NodeToolbar />
						<NodeResizer />
					</ReactFlow>
				</Col>
				<Col span={8}>
					<Panel isNodeSelected={false} />
				</Col>
			</Row>
		</Layout>
	);
};

export default App;
