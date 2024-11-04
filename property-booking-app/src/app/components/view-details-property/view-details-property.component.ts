import { Component } from '@angular/core';
import { IntegrationService } from '../../services/integration.service';
import { ActivatedRoute } from '@angular/router';
import { Property } from '../../models/property';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-details-property',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './view-details-property.component.html',
  styleUrl: './view-details-property.component.css'
})
export class ViewDetailsPropertyComponent {

  properties = new Property;

  property = {  
    images: ['assets/images/p_image_1.jpg', 'assets/images/p_image_2.jpg', 
      'assets/images/p_image_3.jpg', 'assets/images/p_image_4.jpg', 'assets/images/p_image_5.jpg'] 
  };

  constructor(private integration: IntegrationService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
    this.getPropertyDetailsById(this.route.snapshot.params['id']);

  }

  getPropertyDetailsById(id: number) {
    this.integration.getPropertyById(id).subscribe({
      next: (res) => {
        this.properties = res;
      }, error: (err) => {
        console.log("Error response:" + err);
      }
    });
  }
}
