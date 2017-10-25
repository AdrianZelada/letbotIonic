import { Component, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { AwsService} from '../services/aws.service';

import { Gesture} from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { TextToSpeech } from '@ionic-native/text-to-speech';



@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{
  rootPage:any = HomePage;
  recognition:any;
  transcript:string='';
  query:string='';
  debounce:number=500;

  constructor(platform: Platform, statusBar: StatusBar,
     splashScreen: SplashScreen,private awsService:AwsService,
     private speechRecognition: SpeechRecognition, private tts:TextToSpeech) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.speechRecognition.isRecognitionAvailable()
      .then((available: boolean) => console.log(` ${available}`))
      .catch((e)=>console.log(`Error ${e}`));
    });

    this.speechRecognition.requestPermission()
    .then(
      () => console.log('Granted'),
      () => console.log('Denied')
    )

    
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.awsService.$resultText.subscribe((data)=>{
      console.log('aws Result')
      console.log(data)
      this.speak(data.message);
    },
    (e)=>{
      console.log('aws error')
      console.log(e)
    })
  }

  listening(){
    // this.awsService.postText('welcome')
    console.log("adasdasdas")
  }

  initPress(){
    // console.log('init')
    let options={
      language:'en-US',
      matches:5,
      prompt:'Listening',
      showPopup:true,
      showPartial:true
    }
    this.speechRecognition.startListening(options)
    .subscribe(
      (matches: Array<string>) =>{ 
        if(matches.length>0){
          this.transcript=matches[matches.length-1];
          console.log(this.transcript);
        }            
      },
      (onerror) => console.log('error:', onerror)
    )
  
    // this.recognition.startListening()
  }
  endPress(){
    console.log('end')    
    this.speechRecognition.stopListening();
    this.awsService.postText(this.transcript);  
    // this.awsService.postText('gold rings');  
  }

  speak(text){
    this.tts.speak({
      text:text,
      locale:'en-US',
      rate:0
    })
    .then(() => console.log('Success'))
    .catch((reason: any) => console.log(reason));
  }

  cancel(e){
    this.awsService.postText('');      
  }

  getItems(ev:any){
    console.log(ev)
    let val = ev.target.value;      
      if (val && val.trim() != '') {
        this.awsService.postText(val);          
      }
  }

}

