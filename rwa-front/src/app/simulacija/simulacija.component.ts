import { AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { Game } from '../entities/game';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { ActivatedRoute, Router } from '@angular/router';
import { selectGameById, SelectSingleGame } from '../store/game.selectors';
import { loadGame, updateGame } from '../store/game.actions';
import { concatMap, finalize, from, interval, map, Observable, of, startWith,  Subject,  switchMap, takeUntil, takeWhile, tap, timer, toArray } from 'rxjs';
import { GameDto } from '../entities/game.dto';
import { MatDialog } from '@angular/material/dialog';
import { GameOverDialogComponent } from '../game-over-dialog/game-over-dialog.component';

@Component({
  selector: 'app-simulacija',
  templateUrl: './simulacija.component.html',
  styleUrl: './simulacija.component.scss'
})
export class SimulacijaComponent implements OnInit, AfterViewInit{

  gameId: number=0;
  //game$:Observable<Game|null>=this.store.select(SelectSingleGame);
  game:Game|null=null;
  currResT1:number=0;
  currResT2:number=0;
  set1:number=0;
  set2:number=0;
  team1:string="";
  team2:string="";
  side:string[]=["levo", "desno"];
  player:number[]=[1,2,3,4,5,6];//string[]=["one","two","three","four","five","six"];
  pointContacts: number[] = [1, 2, 3, 4]; //0
  currentSide: string = 'levo'; // Start side
  @ViewChildren('player') players!:QueryList<ElementRef>;
  desiredOrder:number[]=[3,6,5,4,1,2,10,7,8,9,12,11];
  stopSimulation$ = new Subject<void>();

  //playersArray:ElementRef<any>[]=[];
  constructor(
    private store: Store<AppState>, 
    private route: ActivatedRoute, 
    private router:Router,
    private renderer: Renderer2,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.gameId = params['id'];
      this.store.dispatch(loadGame({ id: + this.gameId }));
      this.store.select(SelectSingleGame).subscribe((data)=>{
        if(data){
          this.game=data;
          this.set1=this.game.resTeam1;
          this.set2=this.game.resTeam2;
          this.team1=this.game.teams[0].name;
          this.team2=this.game.teams[1].name;
        }
      });
    });
    this.currResT1=this.getRandomInt(0,24);
    this.currResT2=this.getRandomInt(0,24);
    //console.log("players!: ", this.players!);
    this.startSimulation();
  }

  ngAfterViewInit() {
    // Log the QueryList elements in the order they appear in the DOM
    const playersArray=this.players.toArray();
    this.desiredOrder.forEach(index=>{
      if(index-1<playersArray.length){
        //console.log(`Player ${index}: `, playersArray[index - 1].nativeElement);
      }
    })
    this.players.toArray().forEach((player, index) => {
      //console.log(`Player from plyaers ${index + 1}: `, player.nativeElement);
    });
  }

  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  exitSimulation(){
    this.stopSimulation$.next();
    this.router.navigate(['/home-page']); 
  }
  
  startSimulation(){
    // const pointContactsStream$ = of(this.pointContacts).pipe(
    //   switchMap(()=>interval(4000)),
    //   startWith(3),
    //   map(() => this.pointContacts[Math.floor(Math.random() * this.pointContacts.length)]), //map(()=>this.getRandomInt(1,4)),
    //   takeWhile(()=>this.currResT1<25 && this.currResT2<25), 
    //   tap(async contactCount=>await this.handlePoint(contactCount))
    // );
    // pointContactsStream$.subscribe();
    

    of(this.pointContacts).pipe(
      concatMap(() => interval(5000).pipe(  // Waits for one point contact cycle to complete before the next
        startWith(3),
        map(() => this.pointContacts[Math.floor(Math.random() * this.pointContacts.length)]), // Pick random number from pointContacts array
        tap(async contactCount => await this.handlePoint(contactCount)),  // Wait for handlePoint to finish
        takeUntil(this.stopSimulation$)
      )),
      takeWhile(() => this.currResT1 < 25 && this.currResT2 < 25 && this.set1!==3 && this.set2!==3), // Stop when one team reaches 25
      finalize(() => {
        // This will be triggered when the game is over
        this.showGameOverPopup();
      })
    ).subscribe();
  }

  async handlePoint(contactCount:number){
    console.log("contact count from side "+ this.currentSide + ": "+ contactCount);
    //this.selectPlayers(contactCount) returns an array of players based on the contact count.
   
    const players = await this.selectPlayers(contactCount);

    // Convert the array of players to an observable and use concatMap to process them one by one with a delay
    await from(players).pipe(
      concatMap(player => 
        timer(1000).pipe( // Add a delay of 1 second (1000 milliseconds) between each player
          tap(() => this.highlightPlayer(player, this.currentSide))
        )
      )
    ).toPromise();//subscribe();
  
    if (/*contactCount === 0 ||*/ contactCount === 4) {
      //timer(500);
      await this.awardPointToOtherSide();
      this.currentSide = this.currentSide === 'levo' ? 'levo' : 'desno';

    }
    else{
      this.currentSide = this.currentSide === 'levo' ? 'desno' : 'levo';

    }
    //this.currentSide = this.currentSide === 'levo' ? 'desno' : 'levo';

    
  }

  async selectPlayers(contactCount: number):Promise<number[]>{//string[] {
    let players:number[]=[];
    for(let i=0;i<contactCount;i++){
      let p=this.player[Math.floor(Math.random() * this.player.length)];
      // if(players.some(pl=>pl===p)){
      //   p=this.player[Math.floor(Math.random() * this.player.length)];
      // }
      while(players.includes(p)){
        p=this.player[Math.floor(Math.random() * this.player.length)];
      }
      players.push(p);
    }
    console.log("players from select players: ",players);
    return players;
    // console.log("from select player: ", this.player.slice(0, contactCount));
    // return this.player.slice(0, contactCount); // Select players for contact count
  }

  prevPlayer:number=-1;
  prevSide:string="";

  async highlightPlayer(player: number, side: string) {
    
    console.log(`Highlighting ${player} on side ${side}; prevPlayer: ${this.prevPlayer}, prevSide: ${this.prevSide}`);
    
    if(this.prevPlayer!==-1){
      this.changePlayerColor(this.prevPlayer,this.prevSide,'yellow');
    }
    this.changePlayerColor(player,side,'red');
    this.prevPlayer=player;
    this.prevSide=side;
    
    
  }

  async awardPointToOtherSide() {
    if (this.currentSide === 'levo') {
      this.currResT2++;
      //this.changePlayerColor(player, currSide,'yellow');
      console.log("point to: " +this.currentSide + "new res : " +this.currResT2);
    } else {
      this.currResT1++;
      //this.changePlayerColor(player, currSide,'yellow');

      console.log("point to: " +this.currentSide+ "new res : " +this.currResT1);

    }

    if (this.currResT1 >= 25 || this.currResT2 >= 25) {
      //this.changePlayerColor(player, currSide,'yellow');
      console.log('Game over!');
      if(this.currResT1>=25){
        this.changeSetResult(this.set1+1,this.set2);
        this.set1+=1;
      }
      else{
        this.changeSetResult(this.set1,this.set2+1);
        this.set2+=1;
      }
    }
  }

  changePlayerColor(playerPos: number,playerSide:string, color: string) {
    let playerIndex:number=-1;
    if(playerSide==='levo'){
      switch(playerPos){
        //playerpos ide od 1
        case 1:
          playerIndex=2;
          break;
        case 2:
          playerIndex=5;
          break;
        case 3:
          playerIndex=4;
          break;
        case 4:
          playerIndex=3;
          break;
        case 5:
          playerIndex=0;
          break;
        case 6:
          playerIndex=1;
          break;
        default:
          break;
      }
    }
    else{
      //player side is right
      switch(playerPos){
        //playerpos ide od 1
        case 1:
          playerIndex=9;
          break;
        case 2:
          playerIndex=6;
          break;
        case 3:
          playerIndex=7;
          break;
        case 4:
          playerIndex=8;
          break;
        case 5:
          playerIndex=11;
          break;
        case 6:
          playerIndex=10;
          break;
        default:
          break;
      }
    }

    if(playerIndex!==-1){
      const playerDiv = this.players.toArray()[playerIndex];
      if (playerDiv) {
        this.renderer.setStyle(playerDiv.nativeElement, 'background-color', color);
        console.log("div elem: ", playerDiv.nativeElement);
      }
    }
    
  }

  changeSetResult(res1:number, res2:number){
    const dto:GameDto=new GameDto(res1,res2,[]);
    if(this.gameId){
      this.store.dispatch(updateGame({id:this.gameId, updates:dto}));
      this.currResT1=0;//this.getRandomInt(10,20);
      this.currResT2=0;//this.getRandomInt(10,20);
    }
  }

  
  showGameOverPopup() {
    let text1:string="";
    let text2:string="";
    if(this.game){
      if(this.set1===3){
        text1="Game over";
        text2=`${this.game.teams[0].name} won`;
      }else{
        if(this.set2===3){
          text1="Game over";
          text2=`${this.game.teams[1].name} won`;
        }
        text1="You exited live";
        text2="";
      }
    }
    
    const dialogRef = this.dialog.open(GameOverDialogComponent, {
      data: {
        text1:text1,
        text2:text2
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/home-page']); // Replace '/other-page' with the desired route
    });
  }
}
