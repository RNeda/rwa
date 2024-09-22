import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmUpdateDialogComponent } from './confirm-update-dialog.component';

describe('ConfirmUpdateDialogComponent', () => {
  let component: ConfirmUpdateDialogComponent;
  let fixture: ComponentFixture<ConfirmUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmUpdateDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
