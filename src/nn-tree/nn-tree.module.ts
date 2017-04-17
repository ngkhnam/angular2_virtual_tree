import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NNTreeComponent } from './nn-tree.component';
import { NNTreeItem } from './nn-tree-item/nn-tree-item.component';
import { NNTreeNode } from './nn-tree-node';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NNTreeComponent, NNTreeItem],
  exports: [NNTreeComponent, NNTreeItem]
})
export class NNTreeModule { }

export {NNTreeItem, NNTreeComponent, NNTreeNode};
