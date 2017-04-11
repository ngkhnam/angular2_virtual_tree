export class NNTreeNode{
    label: string;
    open?: boolean;
    children?: Array<NNTreeNode>;
    lazyLoading?: boolean;
}