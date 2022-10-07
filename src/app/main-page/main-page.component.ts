import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as Realm from 'realm-web';
import {ConnexionFormComponent} from '../connexion-form/connexion-form.component'
import { environment } from '../../environments/environment';

//const app = ConnexionFormComponent
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(public router: Router) { }
   userRefreshToken : any;
  // bla : any;
   username : any;
   userid : any;
   email : any;
   result : any;
  // app : any
  authorized : boolean;
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
    console.log(user)
  } catch(err) {
    console.error("Echec",err)
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
  collection.find({active:true}).then((value)=>{
    console.log(user)
    console.log(value)
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