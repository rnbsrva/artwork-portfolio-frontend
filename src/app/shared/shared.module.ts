import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './ui/confirm/confirm.component';
import { NavbarComponent } from './ui/navbar/navbar.component';

@NgModule({
  declarations: [ConfirmComponent, NavbarComponent],
  imports: [CommonModule],
  exports: [ConfirmComponent],
})
export class SharedModule {}
