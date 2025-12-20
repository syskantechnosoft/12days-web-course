import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-template-form',
  imports: [FormsModule, JsonPipe],
  templateUrl: './template-form.html',
  styleUrl: './template-form.css',
})
export class TemplateForm {
  user = {
    name: '',
    email: ''
  };

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Form Submitted!', this.user);
      alert('Form Submitted successfully!');
    }
  }
}
