import { Component, ViewChild, OnInit} from '@angular/core';
import { NNVirtualTreeComponent } from '../../src/nn-virtual-tree/nn-virtual-tree.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app works!';
  value = "";
  @ViewChild(NNVirtualTreeComponent) treeComponent: NNVirtualTreeComponent;
  root = null;

  ngOnInit(){
    this.root = this.generateTree();
  }

  generateTree(): any {
    let tree = { label: "root", children: [], open: true };
    for (let i = 0; i < 1000; i++) {
      var child = { label: "child " + i , children: [], open: false};
      var hasChildren = Math.random();
      if (hasChildren) {
        child.open = false;
        for (let j = 0; j < 20; j++) {
          child.children.push({label: "child " + i + "-" + j});
        }
      }
      tree.children.push(child);
    }
    return tree;
  }

  onChangeSelection(node: any){
    //alert(node.label);
    console.log("change selection");
    this.treeComponent.showLoading(node);
  }

  onChangeText(){
    this.treeComponent.filter(this.value);
  }
}
