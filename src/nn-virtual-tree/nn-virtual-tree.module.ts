import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NNVirtualTreeComponent } from './nn-virtual-tree.component';
import { NNTreeItem } from './nn-tree-item/nn-tree-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NNVirtualTreeComponent, NNTreeItem],
  exports: [NNVirtualTreeComponent, NNTreeItem]
})
export class VirtualTreeModule { }

export {NNTreeItem, NNVirtualTreeComponent};
