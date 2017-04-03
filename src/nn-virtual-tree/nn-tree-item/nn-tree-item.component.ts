import { Component, OnInit, Input} from '@angular/core';
import { InternalTreeNode } from '../internal-tree-node';

@Component({
    selector: 'nn-tree-item',
    template: '<div>{{node.label}}</div>',
})
export class NNTreeItem implements OnInit {

    @Input() node: InternalTreeNode;

    constructor() { }

    ngOnInit() { }
}