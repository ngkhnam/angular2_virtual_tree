import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VirtualTreeComponent } from './virtual-tree.component';
import { VirtualTreeItemComponent } from './virtual-tree-item/virtual-tree-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [VirtualTreeComponent, VirtualTreeItemComponent],
  exports: [VirtualTreeComponent, VirtualTreeItemComponent]
})
export class VirtualTreeModule { }
