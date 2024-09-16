import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { selectUserData } from '../store/user.selectors';
import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';
import { deleteUser } from '../store/user.actions';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy{

  profileToDisplay: any;
  isViewProfile: boolean = false;
  amSubscribed: boolean = false;
  @Input()
  isMe: boolean = false;

  avatar: any;
  svg: SafeResourceUrl = '';

  constructor(
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select(selectUserData).subscribe((data) => {
      this.profileToDisplay = data;
    });
    //this.createProfilePicture();
  }
  ngOnDestroy(): void {
  }

  // createProfilePicture() {
  //   this.avatar = createAvatar(lorelei, {
  //     seed: this.determineSeed(),
  //     earringsProbability: 20,
  //     earrings: ['variant01', 'variant02', 'variant03'],
  //     frecklesProbability: 12,
  //     glassesProbability: 30,
  //   });
  //   const svgData = this.avatar.toString();
  //   this.svg = this.sanitizer.bypassSecurityTrustResourceUrl(
  //     'data:image/svg+xml;base64,' + btoa(svgData)
  //   );
  // }

  // determineSeed(): string {
  //   const seedList = [
  //     'Cleo',
  //     'Gizmo',
  //     'Willow',
  //     'Oreo',
  //     'Charlie',
  //     'Tigger',
  //     'Coco',
  //     'Sassy',
  //     'Salem',
  //     'Bandit',
  //     'Leo',
  //     'Pumpkin',
  //     'Sammy',
  //   ];
  //   const seed = seedList[Math.floor((Math.random() * 100) % seedList.length)];
  //   return seed;
  // }


  deleteProfile() {
   this.store.dispatch(deleteUser({ id: this.profileToDisplay.id }));
   this.router.navigateByUrl('/sign-in');
  }
}
