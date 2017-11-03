import { Component, OnInit } from '@angular/core';
import {MailSenderService} from "../../mail/mail-sender.service";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'readme-page',
  templateUrl: './readme-page.component.html',
  styleUrls: ['./readme-page.component.scss']
})
export class ReadmePageComponent implements OnInit {
  isSendingRequest = false;

  closeResult: string;

  constructor(  private mailSenderService : MailSenderService,private modalService: NgbModal) { }

  ngOnInit() {
  }


  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


  async sendMail() {
    try {
      this.isSendingRequest = true;

      await this.mailSenderService.sendMail(
          'Mailgun Sandbox <postmaster@sandbox6a0d333799544b709fbcfea8f4580bae.mailgun.org>',
          'mohamed_aarab@live.nl',
          'testBericht',
          'Dit is een testbericht'
      );

      console.log("Worked");
    } catch (error) {
      console.log("Not worked", error);
    } finally {
      this.isSendingRequest = false;
    }
  }
}
