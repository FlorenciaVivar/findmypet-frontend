import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostPetsDashboardComponent } from './lost-pets-dashboard.component';

describe('LostPetsDashboardComponent', () => {
  let component: LostPetsDashboardComponent;
  let fixture: ComponentFixture<LostPetsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LostPetsDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LostPetsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
