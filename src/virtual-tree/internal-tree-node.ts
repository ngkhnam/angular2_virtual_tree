import { TreeNode } from './tree-node';

export class InternalTreeNode extends TreeNode{
    left: number;
    children: InternalTreeNode[];
    id: string;
    display: boolean;
    level: number;
    top: number;
}