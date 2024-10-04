import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Property } from '../../models/property';
import { IntegrationService } from '../../services/integration.service';

@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css'
})
export class AddPropertyComponent {

  request: Property = new Property;
  formObj: Property = new Property();
  integrationService = inject(IntegrationService);

  onSave() {
    this.request.city = this.formObj.city;
    this.request.location = this.formObj.location;
    this.request.pincode = this.formObj.pincode;
    this.request.propertyTitle = this.formObj.propertyTitle;
    this.request.propertyTypeId = this.formObj.propertyTypeId;
    this.request.state = this.formObj.state;


    this.integrationService.saveProperty(this.request).subscribe({
      next: (res) => {
        console.log("Property details saved successfully with id::"+res.propertyId);

        alert("Property details added successfully with id :: " + res.propertyId);

      }, error: (err) => {
        console.log("Error response:" + err);
      }
    })

  }

}
