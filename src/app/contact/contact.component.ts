import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  isLinear = false;
  isFormSent : boolean = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, private contactService: ContactService) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  sendEmail(){
    const payload = {
      "subject": this.firstFormGroup.value.firstCtrl,
      "message": this.secondFormGroup.value.secondCtrl
    };

    console.log(this.firstFormGroup.value.firstCtrl);
    console.log(this.secondFormGroup.value.secondCtrl);
    this.contactService.sendEmail(payload).subscribe((data) => console.log(data));
  }
  lockForm(){
    this.isFormSent = true;
  }

}
