import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  loginForm: FormGroup;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _http: HttpClient,
    private readonly _router: Router,
    private readonly _toast: ToastrService
  ) {
    this.loginForm = this._fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  onSignInAttempt() {
    if (!this.loginForm.valid) {
      this._toast.error('invalid form');
      return;
    }

    this._http.post<any>('/api/login', this.loginForm.value).subscribe(
      (value: any) => {
        localStorage.setItem('session-token', value.sessionToken);
        localStorage.setItem('user', JSON.stringify(value.user));
        this._toast.success('You are login successfully');
        this._router.navigate(['/artworks']);
      },
      (err) => {
        this._toast.error(err);
      }
    );
  }
}
