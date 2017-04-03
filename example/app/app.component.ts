import { Component, ViewChild, OnInit } from '@angular/core';
import { NNVirtualTreeComponent } from '../../src/nn-virtual-tree/nn-virtual-tree.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  value = "";
  @ViewChild(NNVirtualTreeComponent) treeComponent: NNVirtualTreeComponent;
  root = null;

  ngOnInit() {
    this.root = this.generateTree();
  }

  generateTree(): any {
    let tree = { label: "root", children: [], open: true };
    for (let i = 0; i < 1000; i++) {
      var child = { label: "child " + i, children: [], open: false };
      tree.children.push(child);
    }
    return tree;
  }

  onOpen(node: any) {
    if (!node.children.length) {
      this.treeComponent.showLoading(node);
      let timeId = setTimeout(() => {
        let number = this.getRandomInt(1, 20);
        let children = [];
        for (let i = 0; i < number; i++) {
          let child = { label: "tree-child " + i, children: null, open: false };
          var hasChildren = this.getRandomInt(1, 6);
          if (hasChildren > 3) {
            child.children = [];
          }
          children.push(child);
        }
        this.treeComponent.hideLoading(node);
        this.treeComponent.addNodeChildren(node, children);
      }, 1000);
    }
  }

  onChangeText() {
    this.treeComponent.filter(this.value);
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
