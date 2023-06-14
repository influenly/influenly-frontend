import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { InformationModalComponent } from 'src/app/core/components/UI/information-modal/information-modal.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  signUpForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern('^[a-z0-9\\._%+-]+@([a-z0-9\\._-]+)\\.[a-z]{2,4}$')]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('[a-z0-9._%+-]+')]],
    country: ['', Validators.required]
  });

  get email() { return this.signUpForm.get('email'); }
  get password() { return this.signUpForm.get('password'); }
  get country() { return this.signUpForm.get('country'); }

  countries: string[] = ['AR', 'CA', 'CO', 'PE'];

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private dialog: MatDialog,
              private translate: TranslateService) { }

  submit() {
    if (!this.signUpForm.valid) {
      return;
    }

    const payload = {
      email: this.email?.value,
      password: this.password?.value,
      country: this.country?.value,
      type: 'CREATOR'
    }
    this.authService.signUp$(payload).subscribe({
      next: (v) => {
        let dialogRef = this.dialog.open(InformationModalComponent, {
          width: '600px',
          data: {
            icon: 'mail',
            text: this.translate.instant('landing.sign_up.modal_messages.confirm_email'),
            title: this.translate.instant('landing.sign_up.modal_messages.confirm_email_desc'),
            textButtonOk: this.translate.instant('landing.sign_up.modal_messages.confirm_email_btn'),
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
              textButtonClose: this.translate.instant('general.btn_back')
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



