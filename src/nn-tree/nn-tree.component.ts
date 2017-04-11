import { Component, OnInit, HostBinding, Input, HostListener, ViewChild, ElementRef, EventEmitter, ContentChild, TemplateRef, Output } from '@angular/core';
import { NNTreeNode } from './nn-tree-node';
import { NNInternalTreeNode } from './nn-internal-tree-node';

@Component({
  selector: 'nn-tree',
  templateUrl: './nn-tree.component.html',
  styleUrls: ['./nn-tree.component.css']
})
export class NNTreeComponent implements OnInit {

  @Input() width: number;
  @Input() private selectParent: boolean = false;
  @Input() private lazyLoading = false;
  @Input() loadingText: string = "Loading...";
  @Input() loadingIcon: string = "";
  @Input() private showRoot: boolean = true;
  @Input() private height: number = 100;
  @Output() changeselection: EventEmitter<NNInternalTreeNode> = new EventEmitter();
  @Output() openNode = new EventEmitter<NNInternalTreeNode>();
  @Output() closeNode = new EventEmitter<NNInternalTreeNode>();
  @ContentChild("nnTreeItem") nnTreeItem: TemplateRef<any>;
  @ContentChild("nnTreeToogleIcon") nnTreeToogleIcon: TemplateRef<any>;
  @ViewChild("container") private container: ElementRef;

  private renderNodes: Array<NNInternalTreeNode> = [];
  private displayNodes: Array<NNInternalTreeNode> = [];
  private orginalNodes: Array<NNInternalTreeNode> = [];
  private itemHeight: number = 20;
  private itemsPerViewport: number = 5;
  private startIndex: number = 0;
  private actualHeight: number = 0;
  private selectedNode: NNInternalTreeNode;
  private filterText: string = "";
  private paddingLeft = 20;
  private numDisplayItems = 0;
  private _root: NNInternalTreeNode;
  private _index = 0;

  constructor() { }

  ngOnInit() { }

  @Input()
  set root(root: NNInternalTreeNode) {
    if (this._root !== root) {
      this._root = root;
      root.display = this.showRoot;
      this.initTreeData(root, 0);
      this.actualHeight = this.displayNodes.length * this.itemHeight;
      this.itemsPerViewport = Math.floor(this.height / this.itemHeight) + 2;
      this.renderNodes = new Array<NNInternalTreeNode>(this.itemsPerViewport);
      this.refresh(true);
    }
  }

  private initTreeData(node: NNInternalTreeNode, level: number) {
    node.left = level * this.paddingLeft - (!this.showRoot ? this.paddingLeft : 0);
    node.level = level;
    node.isLeaf = node.lazyLoading ? true : (node.children && node.children.length > 0) ? true : false;
    if (node.display) {
      this.displayNodes.push(node);
    }
    this.orginalNodes.push(node);
    if (node.children && node.children.length)
      node.children.forEach(n => {
        n.display = <boolean>node.open;
        this.initTreeData(n, level + 1);
      });
  }

  private refresh(force?: boolean) {
    var showFromIndex = Math.floor(this.container.nativeElement.scrollTop / this.itemHeight);
    if (this.startIndex != showFromIndex || force) {
      this.startIndex = force ? this.startIndex : showFromIndex;
      let count = 0;
      for (let i = this.startIndex; i < this.displayNodes.length && count < this.renderNodes.length; i++) {
        this.renderNodes[count] = this.displayNodes[i];
        this.renderNodes[count].index = i;
        this.renderNodes[count].top = 0;
        count++;
      }
      this.renderNodes[0].top = this.startIndex * this.itemHeight;
      this.numDisplayItems = count;
    }
  }

  private onClickToogleIcon(node: NNInternalTreeNode) {
    node.open = !node.open;
    node.open ? this.onOpenNode(node) : this.onCloseNode(node);
  }

  private onOpenNode(node: NNInternalTreeNode) {
    node.open = true;
    if (!this.lazyLoading) {
      this.addRenderedChildren(node, node.children);
    }
    this.openNode.emit(node);
  }

  private onCloseNode(node: NNInternalTreeNode) {
    node.open = false;
    node.children.forEach(x => x.display = false);
    this.removeRenderedChildren(node);
    this.closeNode.emit(node);
  }

  private onClickItem(node: NNInternalTreeNode) {
    if (node.children && node.children.length > 0 && !this.selectParent) {
      return;
    }
    if (this.selectedNode != node) {
      if (this.selectedNode)
        this.selectedNode.selected = false;
      this.selectedNode = node;
      this.selectedNode.selected = true;
      this.changeselection.emit(node);
    }
  }

  private onDblclickItem(node: NNInternalTreeNode) {
    if (node.children && node.children.length)
      this.onClickToogleIcon(node);
  }

  filter(text: string) {
    this.filterText = text;
    this.displayNodes = [];
    let indexs = [];
    let currentLevel = 0;
    for (let i = this.orginalNodes.length - 1; i >= 0; i--) {
      let node = this.orginalNodes[i];
      if (node.label.search(text) >= 0) {
        if (node.display)
          indexs.push(i);
        currentLevel = node.level;
      }
      else {
        if (node.level < currentLevel) {
          if (node.display)
            indexs.push(i);
          currentLevel = node.level;
        }
      }
    }

    this.displayNodes = new Array(indexs.length);
    let count = 0;
    for (let i = indexs.length - 1; i >= 0; i--) {
      if (this.orginalNodes[indexs[i]].display)
        this.displayNodes[count++] = this.orginalNodes[indexs[i]];
    }
    this.actualHeight = this.displayNodes.length * this.itemHeight;
    this.refresh(true);
  }

  showLoading(node: NNInternalTreeNode) {
    node.children = [];
    this.removeRenderedChildren(node);
    let n = new NNInternalTreeNode();
    n.open = true;
    n.loading = true;
    this.addRenderedChildren(node, [n]);
  }

  hideLoading(node: NNInternalTreeNode) {
    this.removeRenderedChildren(node);
    node.children = [];
  }

  private addRenderedChildren(node: NNInternalTreeNode, children: NNInternalTreeNode[], noRefresh?: boolean) {
    node.children = children;
    this._index = node.index;
    let count = 0;
    if (children && children.length) {
      children.forEach((x, i) => {
        this._index++;
        x.display = <boolean>node.open;
        x.level = node.level + 1;
        x.index = this._index;
        x.left = node.left + this.paddingLeft;
        x.top = node.top + (count + 1) * this.itemHeight;
        if (x.loading || (x.label != undefined && x.label.search(this.filterText)) >= 0) {
          this.displayNodes.splice(x.index, 0, x);
          this.actualHeight += this.itemHeight;
        }
        if (x.open && x.children && x.children.length) {
          this.addRenderedChildren(x, x.children, true);
        }
      });
    }

    if (!noRefresh)
      this.refresh(true);
  }

  private removeRenderedChildren(node: NNInternalTreeNode) {
    let count = 0;
    for (let i = node.index + 1; i < this.displayNodes.length; i++) {
      if (node.level < this.displayNodes[i].level)
        count++;
      else
        break;
    }
    this.actualHeight -= count * this.itemHeight;
    this.displayNodes.splice(node.index + 1, count);
    this.refresh(true);
  }

  addNodeChildren(node: NNInternalTreeNode, children: NNInternalTreeNode[]) {
    if(children){
      children.forEach(n => {
        n.isLeaf = n.lazyLoading ? true : (n.children && n.children.length > 0) ? true : false;
      });
    }
    this.addRenderedChildren(node, children);
  }

  removeNodeChildren(node: NNInternalTreeNode) {
    node.children = [];
    this.removeRenderedChildren(node);
  }
}
