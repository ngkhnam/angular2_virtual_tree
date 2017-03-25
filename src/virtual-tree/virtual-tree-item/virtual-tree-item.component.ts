import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { InternalTreeNode } from '../internal-tree-node';

@Component({
    selector: 'ng-virtual-tree-item',
    templateUrl: './virtual-tree-item.component.html',
    styleUrls: ['./virtual-tree-item.component.css']
})
export class VirtualTreeItemComponent implements OnInit {
    constructor() { }

    @Input() node: InternalTreeNode; 
    @Output() onOpen: EventEmitter<InternalTreeNode> = new EventEmitter();
    @Output() onClose: EventEmitter<InternalTreeNode> = new EventEmitter(); 
    @Output() clickTitle: EventEmitter<InternalTreeNode> = new EventEmitter();

    ngOnInit() { }

    onClickIcon(){
        this.node.open = !this.node.open;
        this.node.open ? this.onOpen.emit(this.node) :  this.onClose.emit(this.node);
    }

    onClickTitle(){
        this.clickTitle.emit(this.node);
    }
}