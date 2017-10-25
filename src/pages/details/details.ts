import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage implements OnInit{

  item:any={};
  constructor(public navCtrl: NavController, private navParams:NavParams) {

  }

  selectItem(){
    console.log("adaxxxxxxxsdasdas")
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.item=this.navParams.get('paramsItem')
  }
}
