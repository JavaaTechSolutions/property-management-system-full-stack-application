import { Component, inject } from '@angular/core';
import { IntegrationService } from '../../services/integration.service';
import { Property } from '../../models/property';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-property',
  standalone: true,
  imports: [],
  templateUrl: './view-property.component.html',
  styleUrl: './view-property.component.css'
})
export class ViewPropertyComponent {

  properties: Property[] = [];
  sanitizer = inject(DomSanitizer);

  constructor(private integration: IntegrationService) {
  }

  ngOnInit(): void {
    this.getAllProperty();
  }

  getAllProperty() {
    this.integration.getAllProperety().subscribe({
      next: (res) => {
        this.properties = res;

        for (let r of res) {
          r.photo = this.sanitizer.bypassSecurityTrustResourceUrl(
            `data:image/png;base64, ${r.photo}`
          );
        }
      }, error: (err) => {
        console.log("Error response:" + err);
      }
    })
  }

  bookProperty() {
    
  }

}
