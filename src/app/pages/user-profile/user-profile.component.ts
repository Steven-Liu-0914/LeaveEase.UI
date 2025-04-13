import { Component, computed, inject, OnInit } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormErrorComponent } from '../../shared/form-error/form-error.component';
import { UserProfileStore } from '../../stores/user-profile/user-profile.store';
import { injectUserProfileQuery } from '../../api/user-profile/user-profile.query';


@Component({
  standalone: true,
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  providers: [UserProfileStore],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    FormErrorComponent
  ]
})
export class UserProfileComponent {

  private store = inject(UserProfileStore);
  form = this.store.form();
  isFormInValid = this.store.isFormInValid;
  async updateProfile() {
    await this.store.submitProfile();
  }
  injectUserProfileQueryClient = injectUserProfileQuery();

  loadUserProfile = computed(() => {
    const data = this.injectUserProfileQueryClient.data()?.data
    this.form.patchValue({
      ...data
    });
    return true
  }
  );


}
