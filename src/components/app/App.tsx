/**
 * @author Tanay Wagh <tanay.wagh@314ecorp.com>
 * @description
 */

import React, { useCallback, useMemo, useState } from 'react';
import _ from 'lodash';
import { Layout, Row, Col, message } from 'antd';
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
	useReactFlow,
} from 'reactflow';

import MessageNode from '../nodes/MessageNode';
import PageHeader from './PageHeader';
import Panel from '../panel/Panel';
import withProviders from './withProviders';

import '../../styles/style.css';
import 'reactflow/dist/style.css';

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
		data: { value: 'Text message 1' },
	},
	{
		id: 'node-3',
		type: 'message',
		position: { x: 500, y: 200 },
		data: { value: 'Text message 1' },
	},
];

const initialEdges = [
	{ id: 'edge-1', source: 'node-1', target: 'node-3', sourceHandle: 'a' },
	{ id: 'edge-2', source: 'node-2', target: 'node-3', sourceHandle: 'b' },
];

const allNodes = {
	message: { name: 'Message', Icon: MessageOutlined },
};

const nodeTypes = { message: MessageNode };

const App: React.FC = () => {
	const [nodes, setNodes] = useState<Node[]>(initialNodes);
	const [edges, setEdges] = useState<Edge[]>(initialEdges);
	const { project } = useReactFlow();

	const selectedNode = useMemo(() => _.find(nodes, { selected: true }), [nodes]);

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
				if (_.find(eds, { source: params.source })) {
					message.error('Only single link can be created from source handle');
					return edges;
				} else {
					return addEdge(params, eds);
				}
			});
		},
		[setEdges],
	);

	const handleSelectedNodeChange = (modifiedNode: Node) => {
		const newNodes = _.map(nodes, (nd) => {
			if (nd.id === selectedNode?.id) {
				return modifiedNode;
			} else {
				return nd;
			}
		});
		setNodes(newNodes);
	};

	const downloadBlob = () => {
		const stringToDownLoad = JSON.stringify({
			nodes,
			edges,
		});
		const a = document.createElement('a');
		a.href = URL.createObjectURL(new Blob([stringToDownLoad], { type: 'text' }));
		a.download = 'Saved FLow';
		a.click();
		message.success('Successfully saved');
	};

	const handleSaveFlow = () => {
		if (_.size(nodes) > 1) {
			const obj = {};
			_.forEach(edges, ({ source, target }) => {
				_.setWith(obj, source, true, Object);
				_.setWith(obj, target, true, Object);
			});
			if (_.some(nodes, ({ id }) => !_.get(obj, id))) {
				message.error('Unable to save the Flow. One or more nodes have empty target handle');
			} else {
				downloadBlob();
			}
		} else {
			downloadBlob();
		}
	};

	const handleAddNode = (x: number, y: number, nodeType: string) => {
		const newNode = {
			type: nodeType,
			id: Date.now().toString(),
			position: project({ x: x - 50, y: y - 80 }),
			data: { value: 'New Text message' },
		};
		setNodes((nds) => nds.concat(newNode));
	};

	return (
		<Layout>
			<PageHeader onClick={handleSaveFlow} />
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
					<Panel
						nodes={allNodes}
						selectedNode={selectedNode}
						onChange={handleSelectedNodeChange}
						onNodeAdd={handleAddNode}
					/>
				</Col>
			</Row>
		</Layout>
	);
};

export default withProviders(App);
