import { SESSION_STORAGE_KEYS } from './../../shared/services/storages/session-storage.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../core/services/auth.service';
import { InformationModalComponent } from 'src/app/shared/components/UI/information-modal/information-modal.component';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/shared/services/storages/session-storage.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  signUpForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern('^[a-z0-9\\._%+-]+@([a-z0-9\\._-]+)\\.[a-z]{2,4}$')]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('[a-z0-9._%+-]+')]]
  });

  get email() { return this.signUpForm.get('email'); }
  get password() { return this.signUpForm.get('password'); }


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dialog: MatDialog,
    private translate: TranslateService,
    private router: Router,
    private sessionStorage: SessionStorageService
  ) { }

  submit() {
    if (!this.signUpForm.valid) {
      return;
    }

    const payload = {
      email: this.email?.value,
      password: this.password?.value,
      type: window.location.href.split('/').pop()?.toUpperCase()
    }
    this.authService.signUp$(payload).subscribe({
      next: (v) => {
        // this.sessionUtils.onLogin(v.body);
        this.sessionStorage.set(SESSION_STORAGE_KEYS.email, v.body.user.email);
        this.router.navigate(['/email-verification']);
      },
      error: (e) => {
        if (e.error.message === 'EMAIL_ALREADY_EXISTS') {
          this.email?.setErrors({already_exists: true});
        } else {
          let dialogRef = this.dialog.open(InformationModalComponent, {
            width: '600px',
            data: {
              icon: 'warning',
              text: this.translate.instant('landing.sign_up.modal_messages.error_desc'),
              title: this.translate.instant('landing.sign_up.modal_messages.error'),
              textButtonClose: this.translate.instant('general.btn_return')
            }
          });
          const subs = dialogRef.componentInstance.response.subscribe(res => {
            if (res) {
              console.log('reenviar');
            } else {
              subs.unsubscribe();
              dialogRef.close();
            }
          });
        }
      }
    });
  }
}



