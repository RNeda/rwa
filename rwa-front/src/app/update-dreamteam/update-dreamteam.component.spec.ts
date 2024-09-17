import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDreamteamComponent } from './update-dreamteam.component';

describe('UpdateDreamteamComponent', () => {
  let component: UpdateDreamteamComponent;
  let fixture: ComponentFixture<UpdateDreamteamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateDreamteamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDreamteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
