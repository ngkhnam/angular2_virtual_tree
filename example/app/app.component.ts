import { Component, ViewChild, OnInit } from '@angular/core';
import { NNTreeComponent } from '../../src/tree/tree.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  value = "";
  @ViewChild('displayFilterTree') displayFilterTree: NNTreeComponent;
  @ViewChild('lazyLoadingTree') lazyLoadingTree: NNTreeComponent;
  displayFilerRoot = null;
  lazyLoadingRoot = null;

  ngOnInit() {
    this.displayFilerRoot = this.generateTree(5000);
    this.lazyLoadingRoot = this.generateLazyLoadingTree(100);
  }

  generateTree(number: number): any {
    let tree = { label: "root", children: [], open: true };
    for (let i = 0; i < number; i++) {
      var child = { label: "child " + i, children: [], open: false };
      tree.children.push(child);
      var hasChildren = this.getRandomInt(1, 6);
      if(hasChildren > 3){
        child.children = this.generateChildTree(20, child.label);
      }
      
    }
    return tree;
  }

  generateChildTree(number: number, name: string){
    let length = this.getRandomInt(1, number);
    let children  = [];
    for (let i = 0; i < length; i++) {
      var child = { label: "child of " + name + " " + i, children: null, open: false };
      children.push(child);      
    }
    return children;
  }

  generateLazyLoadingTree(number: number): any {
    let tree = { label: "root", children: [], open: true };
    for (let i = 0; i < number; i++) {
      var child = { label: "child " + i, children: [], open: false, lazyLoading: true};
      tree.children.push(child);
    }
    return tree;
  }
  
  onOpen(node: any) {
    if(!node.children)
      node.children = [];
    if (!node.children.length) {
      this.lazyLoadingTree.showLoading(node);
      let timeId = setTimeout(() => {
        let number = this.getRandomInt(1, 20);
        let children = [];
        for (let i = 0; i < number; i++) {
          let child = { label: "lazyLoading-child " + i, children: null, open: false, lazyLoading: false };
          var hasChildren = this.getRandomInt(1, 6);
          if (hasChildren > 3) {
            child.lazyLoading = true;
          }
          children.push(child);
        }
        this.lazyLoadingTree.hideLoading(node);
        this.lazyLoadingTree.addNodeChildren(node, children);
      }, 1000);
    }
  }

  onChangeText() {
    this.displayFilterTree.filter(this.value);
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
