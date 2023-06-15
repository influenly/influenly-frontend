import { LOCAL_STORAGE_KEYS } from './../../core/services/storages/local-storage.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { InformationModalComponent } from 'src/app/core/components/UI/information-modal/information-modal.component';
import { LocalStorageService } from 'src/app/core/services/storages/local-storage.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  signInForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern('^[a-z0-9\\._%+-]+@([a-z0-9\\._-]+)\\.[a-z]{2,4}$')]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  get email() { return this.signInForm.get('email'); }
  get password() { return this.signInForm.get('password'); }

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private dialog: MatDialog,
              private translate: TranslateService,
              private router: Router,
              private localStorage: LocalStorageService) { }

  submit() {
    if (!this.signInForm.valid) {
      return;
    }

    const payload = {
      email: this.email?.value,
      password: this.password?.value
    }
    this.authService.signIn$(payload).subscribe({
      next: (v) => {
        this.localStorage.set(LOCAL_STORAGE_KEYS.token, v.body.token);
        this.router.navigate(['home']);
      },
      error: (e) => {
        if (e.error.message === 'INVALID_PASSWORD') {
          this.password?.setErrors({invalid: true});
        } else if (e.error.message === 'INVALID_EMAIL') {
          this.email?.setErrors({invalid: true});
        } else {
          this.dialog.open(InformationModalComponent, {
            width: '600px',
            data: {
              icon: 'warning',
              text: this.translate.instant('landing.sign_up.modal_messages.error_desc'),
              title: this.translate.instant('landing.sign_up.modal_messages.error'),
              textButtonClose: this.translate.instant('general.btn_back')
            }
          });
        }
      }
    });
  }
}
