import { NNTreeNode } from './nn-tree-node';

export class NNInternalTreeNode extends NNTreeNode{
    left: number;
    children: NNInternalTreeNode[];
    display: boolean;
    level: number;
    top: number;
    index: number;
    selected: boolean;
    loading: boolean;
    isLeaf: boolean;
}