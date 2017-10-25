import { Injectable, OnInit, EventEmitter, ErrorHandler } from '@angular/core';
declare let AWS:any;
@Injectable()
export class AwsService implements OnInit{

    lexruntime:any;
    $resultText :EventEmitter<any> = new EventEmitter();

    params = {
        botAlias: '$LATEST',
        botName: 'kayStoresDev',
        contentType: 'audio/x-l16; sample-rate=16000',
        userId: 'alexaDev',
        accept: 'audio/mpeg',
        inputStream: '',
      };

    constructor() { 
        this.lexruntime = new AWS.LexRuntime({
            region: 'us-east-1',
            credentials: new AWS.Credentials('xxxxxx', 'xxxxxxxx', null)
        });
    }

    ngOnInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
    }

    postText(text:string){
        let sendObject={
            botAlias: this.params.botAlias,
            botName: this.params.botName,
            userId: this.params.userId,
            inputText: text,
            sessionAttributes: {}
          };
          console.log(sendObject);
        if(this.lexruntime.postText){
            this.lexruntime.postText(sendObject,(err:any,data:any)=>{
                if(err){
                    console.log(err,err.stack)
                }else{
                    // speech app   
                    console.log(data);
                    this.$resultText.emit(data);
                }
            })
        }else{
            let e= new ErrorHandler();
            console.log(e);
        }
        
    }


}