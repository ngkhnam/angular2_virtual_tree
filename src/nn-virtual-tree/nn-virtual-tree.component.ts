import { Component, OnInit, HostBinding, Input, HostListener, ViewChild, ElementRef, EventEmitter, ContentChild, TemplateRef, Output} from '@angular/core';
import { TreeNode } from './tree-node';
import { InternalTreeNode } from './internal-tree-node';

@Component({
  selector: 'nn-virtual-tree',
  templateUrl: './nn-virtual-tree.component.html',
  styleUrls: ['./nn-virtual-tree.component.css']
})
export class VirtualTreeComponent implements OnInit {

  @Input() width:number;
  @Input() selectParent:boolean = false;
  @Output() changeselection:EventEmitter<InternalTreeNode> = new EventEmitter();

  displayItems: Array<InternalTreeNode> = [];
  items: Array<InternalTreeNode> = [];
  itemHeight: number = 20;
  itemsPerViewport: number = 5;
  totalItems: number;
  styles: any;
  internalTree: InternalTreeNode;
  startIndex: number = 0;
  actualHeight: number = 0;
  startTop: number = 0;
  currSelectedItem: InternalTreeNode = null;
  @ViewChild("container") container: ElementRef;
  @HostBinding("scrollTop") scrollTop;
  @Input() tree: InternalTreeNode;
  @Input() showRoot: boolean = true;
  @Input() height: number = 100;
  @ContentChild("nnTreeItem") nnTreeItem: TemplateRef<any>;
  @ContentChild("nnTreeToogleIcon") nnTreeToogleIcon: TemplateRef<any>;


  constructor() { }

  ngOnInit() {
    this.tree.display = this.showRoot;
    this.init(this.tree, 0);
    this.actualHeight = this.items.length * this.itemHeight;
    this.itemsPerViewport = Math.floor(this.height / this.itemHeight) + 2;
    this.initDisplayItems();    
  }

  init(tree: InternalTreeNode, level: number) {
    tree.left = level * 20;
    if (tree.display) {
      this.items.push(tree);
    }
    if (tree.children && tree.children.length)
      tree.children.forEach(n => {
        n.display = tree.open;
        this.init(n, level + 1);
      });
  }

  initDisplayItems() {
    for (let i = this.startIndex; i < this.items.length; i++) {
      this.displayItems.push(this.items[i]);
      this.displayItems[i].top = i * this.itemHeight;
      this.displayItems[i].index = i;
      if (this.displayItems.length >= this.itemsPerViewport) {
        break;
      }
    }
  }

  updateDisplay(force: boolean) {
    let _container: HTMLElement = this.container.nativeElement;
    var showFromIndex = Math.max(Math.floor(_container.scrollTop / this.itemHeight), 0);
    if (this.startIndex != showFromIndex || force) {
      this.startIndex = force? this.startIndex : showFromIndex;
      let count = 0;
      for (let i = this.startIndex; i < this.items.length && count < this.displayItems.length; i++) {
        this.displayItems[count] = this.items[i];
        this.displayItems[count].index = i;
        this.displayItems[count].top = count == 0 ? i * this.itemHeight : this.displayItems[count - 1].top + this.itemHeight;
        count++;
      }
    }
  }

  onClickToogleIcon(node: InternalTreeNode){
    node.open = !node.open;
    node.open ? this.onOpenNode(node) : this.onCloseNode(node); 
  }

  onOpenNode(node: InternalTreeNode) {
    node.open = true;
    this.actualHeight += node.children.length * this.itemHeight;
    node.children.forEach((x, i) => {
      this.items.splice(node.index + 1+ i, 0, x);
    });
    this.updateDisplay(true);
  }

  onCloseNode(node: InternalTreeNode) {
    node.open = false;
    this.actualHeight -= node.children.length * this.itemHeight;
    this.items.splice(node.index + 1, node.children.length);
    this.updateDisplay(true);
  }

  onClickItem(node: InternalTreeNode){
    if(node.children && node.children.length > 0 && !this.selectParent){
      return;
    }
    if(this.currSelectedItem != node){
      if(this.currSelectedItem)
        this.currSelectedItem.selected = false;
      this.currSelectedItem = node;
      this.currSelectedItem.selected = true;
      this.changeselection.emit(node);
    }
  }

  onDblclickItem(node: InternalTreeNode){
    if(node.children && node.children.length)
      this.onClickToogleIcon(node);
  }
}
