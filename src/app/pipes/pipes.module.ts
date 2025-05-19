import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VndPipe } from './vnd.pipe';

@NgModule({
  declarations: [VndPipe],
  exports: [VndPipe],
  imports: [CommonModule],
})
export class PipesModule {}
