import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { InformationModalComponent } from 'src/app/shared/components/UI/information-modal/information-modal.component';
import { SessionUtilsService } from '../services/session-utils.service';

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
              private sessionUtils: SessionUtilsService) { }

  submit() {
    if (!this.signInForm.valid) {
      return;
    }

    const payload = {
      email: this.email?.value,
      password: this.password?.value
    }
    this.authService.login$(payload).subscribe({
      next: async (v) => {
        this.sessionUtils.onLogin(v.body);
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
              text: this.translate.instant('landing.sign_in.modal_messages.error_desc'),
              title: this.translate.instant('landing.sign_in.modal_messages.error'),
              textButtonClose: this.translate.instant('general.btn_return')
            }
          });
        }
      }
    });
  }
}
