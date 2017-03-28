import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  tree: any = {
    title: "root",
    open: true,
    children: [
      { title: "child 1", open: false },
      { title: "child 2", open: false },
      { title: "child 3", open: false },
      { title: "child 4", open: false },
      {
        title: "child 5", open: true, children: [
          { title: "child 6" },
          { title: "child 7" },
          { title: "child 8" },
          { title: "child 9" },
          { title: "child 10" },
          { title: "child 11" },
          { title: "child 12" },
          { title: "child 13" }

        ]
      }
    ]
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
    alert(node.label);
  }
}
