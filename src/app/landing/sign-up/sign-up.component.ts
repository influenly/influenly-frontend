import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { InformationModalComponent } from 'src/app/core/components/UI/information-modal/information-modal.component';

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

  countries: string[] = ['AR', 'CO', 'PE'];

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private dialog: MatDialog) { }

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
    this.authService.signUp$(payload).subscribe(res => {
      let dialogRef = this.dialog.open(InformationModalComponent, {
        width: '600px',
        data: {
          icon: 'mail',
          text: 'Puedes cerrar esta ventana al confirmar el email',
          title: 'Te enviamos un email de confirmación',
          textButtonOk: 'Volver a enviar',
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
    });
  }
}



