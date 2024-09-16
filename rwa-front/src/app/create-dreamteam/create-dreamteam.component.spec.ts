import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDreamteamComponent } from './create-dreamteam.component';

describe('CreateDreamteamComponent', () => {
  let component: CreateDreamteamComponent;
  let fixture: ComponentFixture<CreateDreamteamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateDreamteamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDreamteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
