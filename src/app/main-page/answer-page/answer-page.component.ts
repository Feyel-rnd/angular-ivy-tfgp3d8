import { Component, OnInit } from '@angular/core';
import {Sort} from '@angular/material/sort';
import { environment } from '../../../environments/environment';

export interface Analysis {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

export interface Analysis2 {
  _id: any;
  type: string;
  active: boolean;
  name: string;
  validity: any;
  users: any;
  fields: any;
}

@Component({
  selector: 'app-answer-page',
  templateUrl: './answer-page.component.html',
  styleUrls: ['./answer-page.component.css']
})
export class AnswerPageComponent implements OnInit {
  
  app = environment.application
  user : any;
  mongo : any;
  collection : any;
  
  analysis:Analysis2[];

  desserts: Analysis[] = [
  {name: 'Frozen yogurt', calories: 159, fat: 6, carbs: 24, protein: 4},
  {name: 'Ice cream sandwich', calories: 237, fat: 9, carbs: 37, protein: 4},
  {name: 'Eclair', calories: 262, fat: 16, carbs: 24, protein: 6},
  {name: 'Cupcake', calories: 305, fat: 4, carbs: 67, protein: 4},
  {name: 'Gingerbread', calories: 356, fat: 16, carbs: 49, protein: 4},
];

sortedData: Analysis2[];

constructor() {
  this.user = this.app.allUsers[sessionStorage.getItem("userId")]
    
  this.mongo =this.user.mongoClient('Cluster0');
  this.collection = this.mongo.db('Data').collection("Analyses");
  this.collection.find({active:true}).then((value)=>{
       console.log(value)
       this.analysis = value
       //console.log(this.analysis)
  this.sortedData = this.analysis.slice();
    })
    
}

sortData(sort: Sort) {
  
  const data = this.analysis.slice();
  if (!sort.active || sort.direction === '') {
    this.sortedData = data;
    return;
  }

  this.sortedData = data.sort((a, b) => {
    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
      case 'name':
        return compare(a.name, b.name, isAsc);
      case 'calories':
        return compare(a.active, b.active, isAsc);
      case 'fat':
        return compare(a.type, b.type, isAsc);
      // case 'carbs':
      //   return compare(a.carbs, b.carbs, isAsc);
      // case 'protein':
      //   return compare(a.protein, b.protein, isAsc);
      default:
        return 0;
    }
  });
}
  ngOnInit() {
    try {
    
    
  } catch(err) {
    console.error("Echec",err)

  }
  }

}

function compare(a: number | string | boolean, b: number | string | boolean, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
