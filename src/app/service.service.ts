import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/database';
// import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor() { }

    fetchLeaderboard(){
      return new Promise((resolve, reject) => {
        const dbRef = firebase.database().ref('leaderboad');
  
        dbRef.once('value',(data)=>{
          if(data.val()===null){
            reject({'message': 'No data found create one.'});
          }
          else{
            //console.log(data.val());
            resolve(data.val());
          }
        })
  
      })
    }

    store(value){
      return new Promise((resolve, reject) => {
        firebase.database().ref('leaderboad').set({
          ...value
        }).then(()=>{
          resolve();
        }).catch((err)=>{
          reject(err);
        });
  
    });
    }
}
