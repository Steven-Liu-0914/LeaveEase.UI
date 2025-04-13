import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { LoginStore } from '../../stores/login/login.store';
import { ReactiveFormsModule } from '@angular/forms';
import { FormErrorComponent } from '../../shared/form-error/form-error.component';
import { injectLoginCommand } from '../../api/login/login.query';
import { convertToLoginDto } from '../../models/login/login-dto.model';
@Component({
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule, FormErrorComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  router = inject(Router);
  store = inject(LoginStore);
  form = this.store.form();
  isFormInValid = this.store.isFormInValid;

  loginCommend = injectLoginCommand();

  async login() {
    await this.loginCommend.mutateAsync(convertToLoginDto(this.form.value))
      .then((response) => {
        console.log(response);
        this.store.storeLoginInfo(response.data);
        this.router.navigate(['/dashboard']);
      });
  }


}
