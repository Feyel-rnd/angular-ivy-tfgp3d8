import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as Realm from 'realm-web';
import {ConnexionFormComponent} from '../connexion-form/connexion-form.component'
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

//const app = ConnexionFormComponent
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(public router: Router,private _snackBar: MatSnackBar) { }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
   userRefreshToken : string;
  // bla : any;
   username : string;
   userid : string;
   email : string;
   result : any;
  // app : any
  authorized : boolean;
  connected_users : number;
  app = environment.application
  async LogOut(){

    await this.app.allUsers[sessionStorage.getItem("userId")].logOut()
      sessionStorage.clear();
    
    const redirectUrl = '/login';
  
          // Redirect the user
          this.router.navigate([redirectUrl]);
  }
  analyses_actives=""
  ngOnInit() {
    let user : any;
    try {
    user = this.app.allUsers[sessionStorage.getItem("userId")]
    console.log(user.refreshToken)
  } catch(err) {
    console.error("Echec",err)
    //this.openSnackBar("Essai de Snackbar","Fermer")
    //const redirectUrl = '/login';
  
          // Redirect the user
          //this.router.navigate([redirectUrl]);

  }
    //const user = JSON.parse(sessionStorage.getItem("user"))
    
    //this.userRefreshToken = sessionStorage.getItem("userRefreshToken");
    this.userRefreshToken = sessionStorage.getItem("userRefreshToken");
    //console.log(this.app.currentUser)
    this.email = sessionStorage.getItem("email");
    this.username = sessionStorage.getItem("username");
    
    this.authorized = sessionStorage.getItem("userId")=="6322ffbb91365a9b736d5a77";
  const mongo =user.mongoClient('Cluster0');
  const collection = mongo.db('Data').collection("Analyses");
  const collection2 = mongo.db('Users').collection("Example ID");
  //console.log(this.app.allUsers)
  this.connected_users = 0
  Object.keys(this.app.allUsers).forEach((key)=>{
    if (this.app.allUsers[key].isLoggedIn) {
      //console.log(this.connected_users)
      this.connected_users = this.connected_users +1
      
    }
    //console.log(this.app.allUsers[key].isLoggedIn)
  })
  //console.log(this.connected_users)
  collection.find({active:true}).then((value)=>{
    this.analyses_actives = value.length.toString()
  })
  collection2.find({}).then((value)=>{
    this.result = value[0]["owner_id"]
  })
    //sessionStorage.getItem("userRefreshToken");
    //sessionStorage.getItem("email");
    //sessionStorage.getItem("username");
  }
  
}