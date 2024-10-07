import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
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

  isFormView = signal<boolean>(false);
  request: Property = new Property;
  formObj: Property = new Property();
  integrationService = inject(IntegrationService);
  gridData: Property[] = [];

  ngOnInit(): void {
    this.getGridData();
  }

  getGridData() {
    this.integrationService.getAllProperety().subscribe({
      next: (res) => {
        this.gridData = res;
      }, error: (err) => {
        console.log("Error response:" + err);
      }
    }); 
  }

  createNew() {
    this.formObj = new Property;

    this.isFormView.set(!this.isFormView());
  }

  onEdit(data: Property) {
    this.formObj = data;

    this.toggleView();
  }

  onUpdate() {

  }

  onDelete(data: Property) {
    const isDelete = confirm('Are you Sure Want To Delete');

    if (isDelete) {
      this.integrationService.deletePropertyById(data.propertyId).subscribe({
        next: (res) => {
          if (res.response) {
            alert("Record Deleted successfully.");
            this.getGridData();
          } else {
            alert(res.response)
          }
        }
      }) 
    }

  }

  toggleView() {
    this.isFormView.set(!this.isFormView())
  }

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

        this.getGridData();

        this.toggleView();

      }, error: (err) => {
        console.log("Error response:" + err);
      }
    })

  }

}
