import { Component, OnInit, Input} from '@angular/core';
import { InternalTreeNode } from '../internal-tree-node';

@Component({
    selector: 'nn-tree-toogle-icon',
    templateUrl: 'nn-tree-toogle-icon.component.html',
    styles: ['.toogle-children-open{transform: rotate(90deg);}']
})
export class NNTreeToogleIconComponent implements OnInit {

    @Input() node: InternalTreeNode;

    constructor() { }

    ngOnInit() { }
}