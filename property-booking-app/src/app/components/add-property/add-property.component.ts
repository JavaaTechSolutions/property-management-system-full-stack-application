import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Property } from '../../models/property';
import { IntegrationService } from '../../services/integration.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css'
})
export class AddPropertyComponent {
  currentFile?: File;
  isFormView = signal<boolean>(false);
  request: Property = new Property;
  formObj: Property = new Property();
  integrationService = inject(IntegrationService);
  gridData: Property[] = [];
  sanitizer = inject(DomSanitizer);

  ngOnInit(): void {
    this.getGridData();
  }

  imgSrc: string | undefined;

  displayStyle = "none"; 
  
  openPopup() { 
    this.displayStyle = "block"; 
  } 
  closePopup() { 
    this.displayStyle = "none"; 
  } 
 
  onClick(event: any) {
    const imgElem = event.target;
    var target = event.target || event.srcElement || event.currentTarget;
    var srcAttr = target.attributes.src;
    this.imgSrc = srcAttr.nodeValue;

    this.displayStyle = "block"; 
    console.log("Image Source::"+this.imgSrc);
  }

  getGridData() {
    this.integrationService.getAllProperety().subscribe({
      next: (res) => {
        this.gridData = res;

        for (let r of res) {
          r.photo = this.sanitizer.bypassSecurityTrustResourceUrl(
            `data:image/png;base64, ${r.photo}`
          );
        }

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

  selectFile(event: any): void {
    const selectedFiles = event.target.files;

    if (selectedFiles) {
      const file: File | null = selectedFiles.item(0);

      if (file) {
        this.currentFile = file;
      }
    }
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
    this.request.photo = this.formObj.photo;

    this.integrationService.saveProperty(this.request).subscribe({
      next: (res) => {
        if (this.currentFile) {
          this.integrationService.upload(this.currentFile, res.propertyId).subscribe({
            next: (event: any) => {
            },
            error: (err: any) => {
              console.log(err);
            },
            complete: () => {
              this.currentFile = undefined;
            }
          });
        }

        console.log("Property details saved successfully with id::" + res.propertyId);

        alert("Property details added successfully with id :: " + res.propertyId);

        this.getGridData();
        this.toggleView();
      }, error: (err) => {
        console.log("Error response:" + err);
      }
    })

  }

}
