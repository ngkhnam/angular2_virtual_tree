# nn-angular-tree

## Installation

To install this library, run:

```bash
$ npm install nn-angular-tree --save
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import tree module
import { NNTreeModule } from 'nn-angular-tree';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // tree module
    NNTreeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

```xml
<!-- You can now use tree component in app.component.html -->
<nn-tree [root]="root">
	<ng-template let-node="node" #nnTreeItem> 
		<!-- you can custom tree item by relace this item with your item -->
        <nn-tree-item [node]="node"></nn-tree-item>
    </ng-template>
</nn-tree>
```
with root follow NNTreeNode class
```
let root = {label:'root', open: true ,children:[
  {label: 'child 1'},
  {label: 'child 2'},
  {label: 'child 3'}
]}
```
## Feature:
- Single/Multiple selection and custom selection with [canSelect]
- Customizable tree item.
- Lazy loading
- Support a large tree wirh virtual scrolling
- Filtering

## Input Properties:
- showRoot:boolean mean display or hide root node
- loadingIcon:string is url of icon when using lazy loading feature
- loadingText:string is a message text display when wait for load node.
- height/width:number for change size of tree
- canSelect is a function with input is NNTreeNode and return boolean. if true, this node can selected, if false this node can be selected. User can custom selection by implement a function and pass it to this property.
- selectionMode: string support none/single/multiple selection
- selectedNodes is an array of selected nodes.

## Support event:
- selectionChange: $event is new select node:NNTreeNode
- openNode: $event is opened node:NNTreeNode
- closeNode: $event is closed node:NNTreeNode

Examples:
```xml

<nn-tree [root]="root" (openNode)="onOpenNode($event)">
	<ng-template let-node="node" #nnTreeItem> 
        <nn-tree-item [node]="node"></nn-tree-item> 
    </ng-template>
<nn-tree>

```

## Example
[Online demo](https://namngkh.github.io/angular2-tree-example/)    
[Example source here](https://github.com/NamNgKh/angular2-tree-example)

## License

MIT © [Nguyen Khoa Nam](mailto:ngkhnam@gmail.com)
