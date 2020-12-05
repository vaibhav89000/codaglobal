import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-wonloose',
  templateUrl: './wonloose.component.html',
  styleUrls: ['./wonloose.component.scss'],
})
export class WonlooseComponent implements OnInit {

  @Input() selectedApplication: any;
  scores: boolean;
  teamWon: any = 0;

  teamA;
  teamB;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.scores = false;
    console.log(this.selectedApplication);
  }

  Submit() {
    this.modalCtrl.dismiss(this.selectedApplication, 'confirm');
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  // "team_name": "Stronghold",
  //   "wins": 0,
  //   "losses": 0,
  //   "ties": 0,
  //   "score": 0

  score(s, t) {
    this.scores = true;

    this.teamWon = t;
    if (t === 1) {
      this.teamA = "Win";
      this.teamB = "Loose";
    }
    if (t === 2) {
      this.teamB = "Win";
      this.teamA = "Loose";
    }
    if (t === 3) {
      this.teamB = "Tie";
      this.teamA = "Tie";
    }


    if (s === 0) {
      this.selectedApplication[0].score = this.selectedApplication[0].score + 3;
      this.selectedApplication[0].wins += 1;
      this.selectedApplication[1].losses += 1;
    }
    else if (s === 1) {
      this.selectedApplication[1].score = this.selectedApplication[1].score + 3;
      this.selectedApplication[1].wins += 1;
      this.selectedApplication[0].losses += 1;
    }
    else {
      this.selectedApplication[0].ties += 1;
      this.selectedApplication[1].ties += 1;

      this.selectedApplication[0].score += 1;
      this.selectedApplication[1].score += 1;
    }

    console.log(this.selectedApplication);
  }


}
