import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './ui/confirm/confirm.component';

@NgModule({
  declarations: [ConfirmComponent],
  imports: [CommonModule],
  exports: [ConfirmComponent],
})
export class SharedModule {}
