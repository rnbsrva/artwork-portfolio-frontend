import { Component, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent {
  @Output() onConfirm = new EventEmitter<void>();
  @Output() onReject = new EventEmitter<void>();
  @Output() finally = new EventEmitter<void>();

  confirm = () => {
    this.onConfirm.emit();
    this.finally.emit();
  };
  reject = () => {
    this.onReject.next();
    this.finally.emit();
  };
}
