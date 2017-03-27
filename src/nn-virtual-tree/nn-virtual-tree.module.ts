import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VirtualTreeComponent } from './nn-virtual-tree.component';
import { NNTreeItem } from './nn-tree-item/nn-tree-item.component';
import { NNTreeToogleIconComponent } from './nn-tree-toogle-icon/nn-tree-toogle-icon.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [VirtualTreeComponent, NNTreeItem, NNTreeToogleIconComponent],
  exports: [VirtualTreeComponent, NNTreeItem, NNTreeToogleIconComponent]
})
export class VirtualTreeModule { }

export {NNTreeItem, NNTreeToogleIconComponent, VirtualTreeComponent};
