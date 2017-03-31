import { Component, OnInit, HostBinding, Input, HostListener, ViewChild, ElementRef, EventEmitter, ContentChild, TemplateRef, Output } from '@angular/core';
import { TreeNode } from './tree-node';
import { InternalTreeNode } from './internal-tree-node';

@Component({
  selector: 'nn-virtual-tree',
  templateUrl: './nn-virtual-tree.component.html',
  styleUrls: ['./nn-virtual-tree.component.css']
})
export class NNVirtualTreeComponent implements OnInit {

  @Input() width: number;
  @Input() private selectParent: boolean = false;
  @Input() private lazyLoading = false;
  @Output() changeselection: EventEmitter<InternalTreeNode> = new EventEmitter();
  @Output() openNode = new EventEmitter<InternalTreeNode>();
  @Output() closeNode = new EventEmitter<InternalTreeNode>();
  @ViewChild("container") private container: ElementRef;
  @HostBinding("scrollTop") private scrollTop;
  @Input() private tree: InternalTreeNode;
  @Input() private showRoot: boolean = true;
  @Input() private height: number = 100;
  @ContentChild("nnTreeItem") nnTreeItem: TemplateRef<any>;
  @ContentChild("nnTreeToogleIcon") nnTreeToogleIcon: TemplateRef<any>;

  private displayItems: Array<InternalTreeNode> = [];
  private items: Array<InternalTreeNode> = [];
  private orginalItems: Array<InternalTreeNode> = [];
  private itemHeight: number = 20;
  private itemsPerViewport: number = 5;
  private totalItems: number;
  private styles: any;
  private internalTree: InternalTreeNode;
  private startIndex: number = 0;
  private actualHeight: number = 0;
  private startTop: number = 0;
  private currSelectedItem: InternalTreeNode = null;
  private filterText:string = "";
  private paddingLeft = 20;

  constructor() { }

  ngOnInit() {
    this.tree.display = this.showRoot;
    this.init(this.tree, 0);
    this.actualHeight = this.items.length * this.itemHeight;
    this.itemsPerViewport = Math.floor(this.height / this.itemHeight) + 2;
    this.initDisplayItems();
  }

  private init(tree: InternalTreeNode, level: number) {
    tree.left = level * this.paddingLeft;
    tree.level = level;
    if (tree.display) {
      this.items.push(tree);
    }
    this.orginalItems.push(tree);
    if (tree.children && tree.children.length)
      tree.children.forEach(n => {
        n.display = tree.open;
        this.init(n, level + 1);
      });
  }

  private initDisplayItems() {
    for (let i = this.startIndex; i < this.items.length; i++) {
      this.displayItems.push(this.items[i]);
      this.displayItems[i].top = i * this.itemHeight;
      this.displayItems[i].index = i;
      if (this.displayItems.length >= this.itemsPerViewport) {
        break;
      }
    }
  }

  private updateDisplay(force: boolean) {
    let _container: HTMLElement = this.container.nativeElement;
    var showFromIndex = Math.max(Math.floor(_container.scrollTop / this.itemHeight), 0);
    if (this.startIndex != showFromIndex || force) {
      this.startIndex = force ? this.startIndex : showFromIndex;
      let count = 0;
      for (let i = this.startIndex; i < this.items.length && count < this.displayItems.length; i++) {
        this.displayItems[count] = this.items[i];
        this.displayItems[count].index = i;
        this.displayItems[count].top = count == 0 ? i * this.itemHeight : this.displayItems[count - 1].top + this.itemHeight;
        count++;
      }
    }
  }

  private onClickToogleIcon(node: InternalTreeNode) {
    node.open = !node.open;
    node.open ? this.onOpenNode(node) : this.onCloseNode(node);
  }

  private onOpenNode(node: InternalTreeNode) {
    node.open = true;
    if(!this.lazyLoading){
      this.addChildren(node, node.children);
    }
    this.openNode.emit(node);
  }

  private onCloseNode(node: InternalTreeNode) {
    node.open = false;
    node.children.forEach(x => x.display = false);
    this.removeChildren(node);
    this.closeNode.emit(node);
  }

  private onClickItem(node: InternalTreeNode) {
    if (node.children && node.children.length > 0 && !this.selectParent) {
      return;
    }
    if (this.currSelectedItem != node) {
      if (this.currSelectedItem)
        this.currSelectedItem.selected = false;
      this.currSelectedItem = node;
      this.currSelectedItem.selected = true;
      this.changeselection.emit(node);
    }
  }

  private onDblclickItem(node: InternalTreeNode) {
    if (node.children && node.children.length)
      this.onClickToogleIcon(node);
  }

  filter(text: string) {
    this.filterText = text;
    this.items = [];
    let indexs = [];
    let currentLevel = 0;
    for (let i = this.orginalItems.length -1; i >= 0; i--) {
      let item = this.orginalItems[i];
      if (item.label.search(text) >= 0) {
        indexs.push(i);
        currentLevel = item.level;
      }
      else {
        if (item.level < currentLevel) {
          indexs.push(i);
          currentLevel = item.level;
        }
      }
    }

    this.items = new Array(indexs.length);
    let count = 0;
    for(let i = indexs.length -1; i >=0 ; i--){
      if(this.orginalItems[indexs[i]].display)
        this.items[count++] = this.orginalItems[indexs[i]];
    }
    
    this.updateDisplay(true);
  }

  showLoading(node: InternalTreeNode){

  }

  hideLoading(node: InternalTreeNode){

  }

  addChildren(node: InternalTreeNode, children: InternalTreeNode[]){
    node.children = children;
    let count = 0;
    children.forEach((x,i) => {
      x.display = node.open;
      x.level = node.level + 1;
      x.index = node.index + i + 1;
      x.left = node.left + this.paddingLeft;
      x.top = node.top  + (count + 1) * this.itemHeight;
      if(x.label.search(this.filterText) >= 0){
        this.items.splice(node.index + 1 + count++, 0, x);
        this.actualHeight += this.itemHeight;
      }
    });
    this.updateDisplay(true);
  }

  removeChildren(node: InternalTreeNode){
    let count = 0;
    for(let i = node.index + 1; i < this.items.length; i++){
      if(node.level < this.items[i].level)
        count++;
      else
        break;
    }
    this.actualHeight -= count * this.itemHeight;
    this.items.splice(node.index + 1, count);
    this.updateDisplay(true);
  }
}
