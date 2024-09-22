import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCreateDialogComponent } from './confirm-create-dialog.component';

describe('ConfirmCreateDialogComponent', () => {
  let component: ConfirmCreateDialogComponent;
  let fixture: ComponentFixture<ConfirmCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmCreateDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
