import { Injectable } from '@angular/core';
import { ApiAiClient } from 'api-ai-javascript';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
declare var p5: any;

export class Message {
  constructor(public content: any, public sentBy: string, public demand_data?: any) { }
}

@Injectable()
export class HomeService {

  readonly token = "cb3136484b184f73abe4d99761e387d2";
  // readonly token = "00c8211c013a4f218ab3bfc8fef33bcd";
  //readonly token = "25673e4bf0fe4dffa69f0bb154dfca95";
  readonly client = new ApiAiClient({ accessToken: this.token });
  conversation = new BehaviorSubject<Message[]>([]);

  demand_data = [];
  private componentMethodCallSource = new Subject<any>();
  componentMethodCalled$ = this.componentMethodCallSource.asObservable();


  constructor() { }
  // Sends and receives messages via DialogFlow
  converse(msg: string) {
    const userMessage = new Message(msg, 'user');
    this.update(userMessage);

    return this.client.textRequest(msg)
      .then(res => {
        var mesg_arr1 = JSON.stringify(res.result.fulfillment);
        var msg2 = JSON.parse(mesg_arr1)

        // console.log(msg2.data)
        if (msg2.data != undefined) {
          console.log("Has some data")
          this.demand_data = msg2.data[0].data_response;
          this.componentMethodCallSource.next();
        }
        for (var j = 0; j < msg2.messages.length; j++) {
          let one_msg = msg2.messages[j].speech
          const botMessage = new Message(one_msg, 'bot', this.demand_data);
          this.update(botMessage);
          //response speech
          let voice = new p5.Speech();
          voice.speak(one_msg);
        }


      });
  }
  // Adds message to source
  update(msg: Message) {
    console.log("service update()" + this.conversation)
    this.conversation.next([msg]);
  }


  getDemandData() {
    return this.demand_data;
  }

}
