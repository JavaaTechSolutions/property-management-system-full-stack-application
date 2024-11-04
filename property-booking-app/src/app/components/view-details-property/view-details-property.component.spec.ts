import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailsPropertyComponent } from './view-details-property.component';

describe('ViewDetailsPropertyComponent', () => {
  let component: ViewDetailsPropertyComponent;
  let fixture: ComponentFixture<ViewDetailsPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDetailsPropertyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDetailsPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
