import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NNTreeComponent } from './tree.component';
import { NNTreeItem } from './tree-item/tree-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NNTreeComponent, NNTreeItem],
  exports: [NNTreeComponent, NNTreeItem]
})
export class NNTreeModule { }

export {NNTreeItem, NNTreeComponent};
