import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NNTreeComponent } from './nn-tree.component';
import { NNTreeItem } from './nn-tree-item/nn-tree-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NNTreeComponent, NNTreeItem],
  exports: [NNTreeComponent, NNTreeItem]
})
export class NNTreeModule { }

export {NNTreeItem, NNTreeComponent};
