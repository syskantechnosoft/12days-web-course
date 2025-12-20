import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-template-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './template-form.html',
  styleUrl: './template-form.css',
})
export class TemplateForm {

  formData:ContactForm = {
    name:'',
    email:'',
    message:''
  };

  submitted = signal(false);

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Form Data:', this.formData);
      this.submitted.set(true);
      alert('Form Submitted Successfully!!!');
      // Reset form after 2 seconds
      setTimeout(() => {
        form.reset();
        this.submitted.set(false);
      }, 2000);
    }
  }
}
