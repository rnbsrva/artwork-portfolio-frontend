import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  registerForm: FormGroup;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _http: HttpClient,
    private readonly _router: Router,
    private readonly _tostr: ToastrService
  ) {
    this.registerForm = this._fb.group({
      username: [null, [Validators.required]],
      password: [, [Validators.required]],
      firstName: [, [Validators.required]],
      lastName: [, [Validators.required]],
      country: [, [Validators.required]],
      age: [, [Validators.required]],
      email: [, [Validators.required]],
    });
  }

  onRegisterAttempt() {
    if (!this.registerForm.valid) {
      this._tostr.error('Invalid form');
      return;
    }
    this._http
      .post('/api/register', this.registerForm.value)
      .subscribe((value: any) => {
        localStorage.setItem('session-token', value.sessionToken);
        localStorage.setItem('user', JSON.stringify(value.user));
        this._tostr.success('You are registered successfully');
        this._router.navigate(['/artworks']);
      });
  }
}
