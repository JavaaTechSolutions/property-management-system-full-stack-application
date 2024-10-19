import { Component } from '@angular/core';
import { DashboardResponse } from '../../models/dashboard-response';
import { IntegrationService } from '../../services/integration.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  response: DashboardResponse = new DashboardResponse;

  constructor(private integration: IntegrationService) {
  }

  ngOnInit(): void {
    this.loadDashboardData()
  }

  loadDashboardData() {
    this.integration.dashboard().subscribe({
      next: (res) => {
        this.response = res;
        console.log("Dashboard res:"+res.response);
      }
    });
  }
}
