/**
 * @author Tanay Wagh <tanay.wagh@314ecorp.com>
 * @description Root component rendering react flow layout and nodes panel
 */

import React, { useCallback, useMemo, useState } from 'react';
import _ from 'lodash';
import { Layout, Row, Col, message } from 'antd';
import ReactFlow, {
	applyEdgeChanges,
	applyNodeChanges,
	addEdge,
	Node,
	Edge,
	Connection,
	NodeChange,
	EdgeChange,
	useReactFlow,
} from 'reactflow';

import PageHeader from './PageHeader';
import Panel from '../panel/Panel';
import withProviders from './withProviders';
import { initialNodes, initialEdges, nodeTypes } from '../../constants/index';

import '../../styles/style.css';
import 'reactflow/dist/style.css';

const reactFlowNodeTypes = _.mapValues(nodeTypes, (val) => val.node);

const App: React.FC = () => {
	const [nodes, setNodes] = useState<Node[]>(initialNodes);
	const [edges, setEdges] = useState<Edge[]>(initialEdges);
	const { project } = useReactFlow();

	const selectedNode = useMemo(() => {
		return _.find(nodes, { selected: true });
	}, [nodes]);

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

	const handleAddNode = (x: number, y: number, nodeType: string, defaultVal: string | null) => {
		const newNode = {
			type: nodeType,
			id: Date.now().toString(),
			position: project({ x: x - 50, y: y - 80 }),
			data: { value: defaultVal },
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
						nodeTypes={reactFlowNodeTypes}
						onNodesChange={handleNodesChange}
						onEdgesChange={handleEdgesChange}
						onConnect={handleConnect}
					/>
				</Col>
				<Col span={6}>
					<Panel
						nodes={nodeTypes}
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
