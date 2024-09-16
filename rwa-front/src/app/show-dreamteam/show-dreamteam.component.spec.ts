import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDreamteamComponent } from './show-dreamteam.component';

describe('ShowDreamteamComponent', () => {
  let component: ShowDreamteamComponent;
  let fixture: ComponentFixture<ShowDreamteamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowDreamteamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowDreamteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
