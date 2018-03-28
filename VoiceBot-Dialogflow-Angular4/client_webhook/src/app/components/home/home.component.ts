import { Component, ViewChildren, ViewChild, ElementRef, QueryList, OnInit } from '@angular/core';
import { HomeService, Message } from './home.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/scan';
declare var p5: any;
declare var $: any;
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeService]
})


export class HomeComponent implements OnInit {

  @ViewChildren('messages') cust_messages: QueryList<any>;
  @ViewChild('content') cust_content: ElementRef;
  @ViewChild(BaseChartDirective) _chart: any;
  demand_data = [];


  public barChartData:any[]=[{data:[]}];
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartLabels = [];


  constructor(private chatService: HomeService) {
    $("#cust_input").focus();
    console.log("HomeComponent constucto()")
  }

  place_holder = "Type a message";
  messages: Observable<Message[]>;
  formValue: string;


  lan = navigator.language || 'en-IN';

  speechRec = new p5.SpeechRec('en-IN', () => {
    if (this.speechRec.resultValue) {
      this.barChartData = [];
      console.log(this.speechRec.resultString)
      let response = this.chatService.converse(this.speechRec.resultString);
      $("#cust_input").focus();
      $("#cust_input").blur();

      setTimeout(() => {
        $("#cust_input").focus();
        $("#cust_input").blur();
      }, 1000);
    }
  });



  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  collectionDate;
  skill_set: any;
  ngOnInit() {
    $('#graph_div').hide();
    // appends to array after each new message is added to feedSource
    this.messages = this.chatService.conversation.asObservable()
      .scan((acc, val) => acc.concat(val));

    //to get the demand data
    this.chatService.componentMethodCalled$.subscribe(
      () => {
        this.demand_data = this.chatService.getDemandData();
        if (this.demand_data.length > 0) {
          console.log("show()")
          $('#graph_div').show();
          this.barChartLabels = []
          var months_details = JSON.parse(JSON.stringify(this.demand_data[this.demand_data.length - 1])).months;
          this.barChartLabels = months_details;
          for (let i = 0; i < this.demand_data.length - 1; i++) {
            var data_arr = new Array(this.barChartLabels.length);
            var index_ar = this.barChartLabels.indexOf(this.demand_data[i].ApprovalDate);
            data_arr[index_ar] = this.demand_data[i].InitialDemand;
            this.barChartData.push({ data: data_arr, label:this.demand_data[i].ApprovalDate+" - " +this.demand_data[i].InitialDemand, month: this.demand_data[i].ApprovalDate });
          }//for
          console.log(this.barChartLabels)
          console.log(this.barChartData)
          //to refresh chart
          setTimeout(() => {
            this._chart.refresh();
            
          },0);

        }else{
          console.log("hide()")
          $('#graph_div').hide();
        }
        this.cust_messages.changes.subscribe(this.scrollToBottom);

      }
    );

  }

  //send messages 
  sendMessage() {
    console.log("sendMessage() ")
    this.barChartData = [];
    this.demand_data = []
    let response = this.chatService.converse(this.formValue);
    console.log("response:", response);
    this.formValue = '';
  }



  clicks1 = 0;
  continuous: boolean = true;
  interim: boolean = false;
  //to enable voice chat button 
  voiceChat() {
    console.log(this.clicks1)
    if (this.clicks1 % 2 == 0) {
      console.log(this.clicks1 + "on")
      this.place_holder = "Listening & also you can Type a message";
      this.speechRec.start(this.continuous, this.interim);
    } else {
      console.log(this.clicks1 + "off")
      this.place_holder = "Type a message";
      this.speechRec.start(this.continuous, this.interim);
      new p5.Speech().stop();
    }
    this.clicks1++;
  }

  //click evnet for toggle chat button
  clicks = 0;
  show: boolean;
  onClick(event) {
    console.log(this.clicks)
    if (this.clicks % 2 == 0) {
      $("#cust_input").focus();
      this.show = true;
    } else {
      $("#cust_input").focus();
      this.show = false;
    }
    this.clicks++;
  }

  ngAfterViewInit() {
    this.cust_messages.changes.subscribe(this.scrollToBottom);
  }

  //hidden scroll button for chat window
  scrollToBottom = () => {
    try {
      this.cust_content.nativeElement.scrollTop = this.cust_content.nativeElement.scrollHeight;
    } catch (err) { }

  }

  uploadFile() {
    console.log("uploadFile()()")
  }




}

