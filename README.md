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
- Single selection and multi selection in future
- Customizable tree item.
- Lazy loading
- Support a large tree wirh virtual scrolling

## Input Properties:
- showRoot:boolean mean display or hide root node
- loadingIcon:string is url of icon when using lazy loading feature
- loadingText:string is a message text display when wait for load node.
- height/width:number for change size of tree

## Support event:

- changeselection: $event is new select node:NNTreeNode
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
## License

MIT © [Nguyen Khoa Nam](mailto:ngkhnam@gmail.com)
