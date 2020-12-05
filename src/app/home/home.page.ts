import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { ServiceService } from '../service.service';
import { WonlooseComponent } from '../wonloose/wonloose.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  
  teams: any;
  noTeamsSelect: number = 0;
  teamsindex: any = [];
  teamsdetails: any = [];

  constructor(
    private loadingCtrl: LoadingController,
    private alert: AlertController,
    private navCtrl: NavController,
    private router: Router,
    private service: ServiceService,
    private route: ActivatedRoute,
    private modalCtrl: ModalController
  ) {
    
  }

  ngOnInit() {
    // console.log(this.teamsindex);
    // console.log(this.teamsdetails);
    this.teamsindex = [];
    this.teamsdetails = [];
    
    this.fetchLeaderboard();
  }

  fetchLeaderboard(){
    this.loadingCtrl.create({ keyboardClose: true, message: 'Loading Scoreboard' })
            .then(loadingEl => { 
              loadingEl.present();

              this.service.fetchLeaderboard().then(res => {
                this.teams = res;
                loadingEl.dismiss();
              },err =>{
                loadingEl.dismiss();
                console.log(err);
              })
             })
  }

  // ionViewDidEnter(){
  //   this.teams = [
  //     {
  //       "team_name": "Konklux",
  //       "wins": 0,
  //       "losses": 0,
  //       "ties": 0,
  //       "score": 0
  //     },
  //     {
  //       "team_name": "Stronghold",
  //       "wins": 0,
  //       "losses": 0,
  //       "ties": 0,
  //       "score": 0
  //     },
  //     {
  //       "team_name": "Toughjoyfax",
  //       "wins": 0,
  //       "losses": 0,
  //       "ties": 0,
  //       "score": 0
  //     }
  //    ];
  // }

  // selected(i){
  //   this.noTeamsSelect += 1;
  //   this.teamsindex.push(i);
  //   // console.log(this.noTeamsSelect);
  //   console.log(this.teamsindex);
  // }

  datachanged(e:any,i,team){
    // console.log(e);
    // console.log(e.detail.checked);
    if(e.detail.checked){
        this.teamsindex.push(i);
        this.teamsdetails.push(team);
        if(this.teamsindex.length === 2){
          // console.log(2);
          this.modalopen(this.teamsdetails,this.teamsindex);
        }
    }
    else{
      var index = this.teamsindex.indexOf(i);
      if (index !== -1) {
        this.teamsindex.splice(index, 1);
        this.teamsdetails.splice(index, 1);
      }
      // console.log(this.teamsindex);
    }    
}

    modalopen(teams,index){
      // console.log(teams);
      let teamrecord = {
        0: {
          ...teams[0],
          index: index[0]
        },
        1: {
          ...teams[1],
          index: index[1]
        }
      }

      // console.log(teamrecord);

      this.modalCtrl.create({
        component: WonlooseComponent,
        componentProps: { selectedApplication: teamrecord }
      })
        .then(modalEl => {
          modalEl.present();
          return modalEl.onDidDismiss();
        })
        .then(resultdata => {
          console.log(resultdata);
          this.router.navigate(['/home']);
          this.ngOnInit();

          let teamAindex = resultdata.data['0'].index;
          let teamBindex = resultdata.data['1'].index;

          let teamA = resultdata.data['0'];
          let teamB = resultdata.data['1'];
          delete teamA['index']; 
          delete teamB['index']; 
          // console.log(teamA);
          // console.log(teamB);

          this.teams[teamAindex] = teamA;
          this.teams[teamBindex] = teamB;
          console.log(this.teams);
          // let leaderboard = this.teams;
          // for(let l=0;l<leaderboard.length;l++){
          //   this.teams[l] = {
          //     ...this.teams[l],
          //     id: l
          //   }
          // }

          this.loadingCtrl.create({ keyboardClose: true, message: 'Loading Applications' })
            .then(loadinEl => {
              loadinEl.present();

              this.service.store(this.teams).then(res => {
                loadinEl.dismiss();
                console.log(res);
              },err => {
                loadinEl.dismiss();
                console.log(err);
              })
             })
          
        })



    }

}
