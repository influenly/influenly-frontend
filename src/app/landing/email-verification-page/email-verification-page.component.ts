import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { EmailValidationService } from './services/email-validation.service';
import { Router } from '@angular/router';
import { InformationModalComponent } from 'src/app/shared/components/UI/information-modal/information-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { SESSION_STORAGE_KEYS, SessionStorageService } from 'src/app/shared/services/storages/session-storage.service';

@Component({
  selector: 'app-email-verification-page',
  templateUrl: './email-verification-page.component.html',
  styleUrls: ['./email-verification-page.component.scss']
})
export class EmailVerificationPageComponent {

  @ViewChildren('input') inputs: QueryList<ElementRef> | undefined;

  formValidation: FormGroup;
  isValid: boolean = false;
  hidenEmail: string = ''

  constructor(
    private fb: FormBuilder,
    private emailVerificationService: EmailValidationService,
    private router: Router,
    private dialog: MatDialog,
    private translate: TranslateService,
    private sessionStorage: SessionStorageService
  ) {
    this.formValidation = this.fb.group({
      codeArray: this.fb.array(
        Array(6).fill('').map(() => this.fb.control('', [
          Validators.required,
          Validators.pattern('[0-9]')
        ]))
      ),
      code: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]]
    });
  }

  ngOnInit() {
    this.init();
  }

  private async init() {
    this.formValidation.get('codeArray')?.valueChanges.subscribe(values => {
      this.formValidation.get('code')?.setValue(values.join(''), { emitEvent: false });
    });
    const email = await this.sessionStorage.getFirst(SESSION_STORAGE_KEYS.email);
    this.hidenEmail = this.hideEmail(email);
  }

  private hideEmail(email: string): string {
    return email.substring(0, 1) + '********' + email.substring(email.indexOf('@'), email.length);
  }

  get codeControls() {
    return this.formValidation.get('codeArray') as FormArray;
  }

  get code() {
    return this.formValidation.get('code');
  }

  onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value && value.match(/^[0-9]$/)) {
      if (index < 5) {
        setTimeout(() => {
          const nextInput = this.inputs?.toArray()[index + 1].nativeElement;
          nextInput.focus();
        }, 10);
      }
    }

    this.isValid = this.formValidation.valid;
  }

  onFocus(event: FocusEvent) {
    const input = event.target as HTMLInputElement;
    input.select();
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace' && !input.value && index > 0) {
      setTimeout(() => {
        const prevInput = this.inputs?.toArray()[index - 1].nativeElement;
        prevInput.focus();
      }, 10);
    }

    this.isValid = this.formValidation.valid;
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const clipboardData = event.clipboardData;
    const pastedText = clipboardData?.getData('text');

    if (pastedText && pastedText.match(/^[0-9]{6}$/)) {
      const values = pastedText.split('');
      values.forEach((value, index) => {
        this.codeControls.at(index).setValue(value);
      });

      setTimeout(() => {
        const lastInput = this.inputs?.toArray()[5].nativeElement;
        lastInput.focus();
      }, 10);
    }

    this.isValid = this.formValidation.valid;
  }

  validate() {
    console.log(this.code?.value)
    const payload = {
      code: Number(this.code?.value)
    }
    this.emailVerificationService.validateCoode$(payload).subscribe({
      next: (res) => {
        if (res.body.ok) {
          this.dialog.open(InformationModalComponent, {
            width: '600px',
            data: {
              icon: 'check',
              text: this.translate.instant('landing.email_verification.validation_ok'),
              textButtonClose: this.translate.instant('general.btn_return')
            }
          });
          this.router.navigate(['/login']);
        } else {
          this.setInvalidError();
        }
      },
      error: () => {
        this.dialog.open(InformationModalComponent, {
          width: '600px',
          data: {
            icon: 'warning',
            text: this.translate.instant('landing.email_verification.error_validate'),
            textButtonClose: this.translate.instant('general.btn_return')
          }
        });
      }
    });
  }

  private setInvalidError() {
    this.codeControls.controls.forEach(control => {
      control.setErrors({invalid: true});
    });
    this.codeControls.setErrors({invalid: true});
  }

  cancel() {
    this.router.navigate(['/']);
  }

  resend() {
    this.emailVerificationService.resendCoode$().subscribe({
      next: (response) => {
        console.log(response)
      },
      error: () => {
        this.dialog.open(InformationModalComponent, {
          width: '600px',
          data: {
            icon: 'warning',
            text: this.translate.instant('landing.email_verification.error_resend'),
            textButtonClose: this.translate.instant('general.btn_return')
          }
        });
      }
    });
  }

}
