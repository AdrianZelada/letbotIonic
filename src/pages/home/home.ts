import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage} from '../details/details'
import { AwsService} from '../../services/aws.service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  message:string='';
  items:any=[];
  constructor(public navCtrl: NavController,private awsService:AwsService) {

  }

  selectItem(item:any){
    // console.log("adaxxxxxxxsdasdas")
    this.navCtrl.push(DetailsPage,{
      paramsItem:item
    });
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.awsService.$resultText.subscribe((data)=>{
      this.message=data.message;
      if(data.dialogState=='Fulfilled'){
        if(data.sessionAttributes.currentRequest){
          console.log(JSON.parse(data.sessionAttributes.currentRequest))
          let response:any=JSON.parse(data.sessionAttributes.currentRequest);
          if(response.responseCard){          
            this.items=response.responseCard;
          }        
        }
      }else{
        this.items=[];
      }
    },
    (e)=>{
      console.log('aws error')
      console.log(e)
    })
  }

  // listening(){
  //   console.log("adasdasdas")
  // }

}
