import { Component, OnInit, HostBinding, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { TreeNode } from './tree-node';
import { InternalTreeNode } from './internal-tree-node';

@Component({
  selector: 'ng-virtual-tree',
  templateUrl: './virtual-tree.component.html',
  styleUrls: ['./virtual-tree.component.css']
})
export class VirtualTreeComponent implements OnInit {
  displayItems: Array<InternalTreeNode> = [];
  items: Array<InternalTreeNode> = [];
  itemHeight: number = 40;
  itemsPerViewport: number = 5;
  totalItems: number;
  styles: any;
  internalTree: InternalTreeNode;
  startIndex: number = 0;
  actualHeight: number = 0;
  startTop: number = 0;


  @ViewChild("container") container: ElementRef;
  @HostBinding("scrollTop") scrollTop;
  @Input() tree: InternalTreeNode;
  @Input() showRoot: boolean = false;
  @Input() height: number = 100;


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
      if (this.displayItems.length >= this.itemsPerViewport) {
        this.startIndex = i;
        break;
      }
    }
  }

  onOpenNode(node: InternalTreeNode) {
    node.open = true;
    this.height += node.children.length * this.itemHeight;
  }

  onCloseNode(node: InternalTreeNode) {
    node.open = false;
    this.height -= node.children.length * this.itemHeight;
  }

  onScrollDown(numberItemsNeedtoAdd: number) {
    this.displayItems.splice(0, numberItemsNeedtoAdd);
    for (let i = this.startIndex + this.itemsPerViewport + 1; i < this.items.length; i++) {
      if (this.items[i].display) {
        this.displayItems.splice(0, 0, this.items[i]);
        if (this.displayItems.length >= this.itemsPerViewport) {
          this.startIndex = i;
          break;
        }
      }
    }
  }

  onScrollUp(numberItemsNeedtoAdd: number) {
    this.displayItems.splice(this.displayItems.length - 1 - numberItemsNeedtoAdd, numberItemsNeedtoAdd);
    for (let i = this.startIndex - 1; i > 0; i--) {
      if (this.items[i].display) {
        this.displayItems.push(this.items[i]);
        if (this.displayItems.length >= this.itemsPerViewport) {
          this.startIndex = i;
          break;
        }
      }
    }
  }

  updateDisplay() {
    let _container: HTMLElement = this.container.nativeElement;
    var showFromIndex = Math.max(Math.floor(_container.scrollTop / this.itemHeight), 0);
    if (this.startIndex != showFromIndex) {
      this.startIndex = showFromIndex;
      let count = 0;
      for (let i = this.startIndex; i < this.items.length && count < this.displayItems.length; i++) {
        this.displayItems[count] = this.items[i];
        this.displayItems[count].top = count == 0 ? (this.startIndex + count) * this.itemHeight : this.displayItems[count - 1].top + this.itemHeight;
        count++;
      }
    }
  }
}
