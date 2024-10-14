import { Component, OnInit } from '@angular/core';
import { AhmadService } from '../../../services/ahmad.service';

@Component({
  selector: 'app-get-contact-messages',
  templateUrl: './get-contact-messages.component.html',
  styleUrls: ['./get-contact-messages.component.css'] // Fixed here
})
export class GetContactMessagesComponent implements OnInit { // Implementing OnInit

  messages: any[] = [];

  constructor(private contactService: AhmadService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.contactService.getAllMessages().subscribe(
      (data: any[]) => {
        console.log('Messages received:', data); // Log the data
        this.messages = data;
      },
      (error: any) => console.error('Error loading messages:', error)
    );
  }

}
