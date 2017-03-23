import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VirtualTreeComponent } from './virtual-tree.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [VirtualTreeComponent],
  exports: [VirtualTreeComponent]
})
export class VirtualTreeModule { }
