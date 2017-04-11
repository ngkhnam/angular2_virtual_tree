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
<!-- You can now use your library component in app.component.html -->
<nn-tree [root]="root"></nn-tree>
```
with root follow NNTreeNode class
```
let root = {label:'root', open: true ,children:[
  {label: 'child 1'},
  {label: 'child 2'},
  {label: 'child 3'}
]}
```
## Support event:

- changeselection: $event is new select node:NNTreeNode
- openNode: $event is opened node:NNTreeNode
- closeNode: $event is closed node:NNTreeNode

Examples:
```xml

<nn-tree [root]="root" (openNode)="onOpenNode($event)"><nn-tree>

```
## License

MIT © [Nguyen Khoa Nam](mailto:ngkhnam@gmail.com)
