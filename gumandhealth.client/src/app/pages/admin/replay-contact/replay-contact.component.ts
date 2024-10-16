import { Component, OnInit } from '@angular/core';
import { AhmadService } from '../../../services/ahmad.service'; // Adjust the import path
import Swal from 'sweetalert2'; // Import SweetAlert2

@Component({
  selector: 'app-replay-contact',
  templateUrl: './replay-contact.component.html',
  styleUrls: ['./replay-contact.component.css']
})
export class ReplayContactComponent implements OnInit {
  messages: any[] = [];
  replyText: string = '';
  selectedMessage: any; // To hold the message being replied to

  constructor(private ahmadService: AhmadService) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.ahmadService.getAllMessages().subscribe(data => {
      this.messages = data;
      console.log("Loaded messages:", this.messages); // Debugging output
    });
  }

  setReply(message: any): void {
    this.selectedMessage = message; // Store the selected message
    this.replyText = ''; // Clear any previous reply text
  }

  reply(): void {
    if (this.selectedMessage && this.replyText) {
      const senderEmail = this.selectedMessage.email; // Use the sender's email
      const senderName = this.selectedMessage.name; // Use the sender's name

      console.log(`Preparing to send email to: ${senderEmail}, from: ${senderName}, message: ${this.replyText}`); // Debugging output

      this.ahmadService.sendEmail(senderName, 'Admin Name', senderEmail, this.replyText)
        .then(() => {
          console.log(`Email sent successfully to: ${senderEmail}`); // Debugging output
          this.replyText = ''; // Clear input after sending
          this.selectedMessage = null; // Clear selected message
          this.loadMessages(); // Reload messages if needed

          // Show success alert with the recipient's email
          Swal.fire({
            icon: 'success',
            title: 'Email Sent!',
            text: `Your reply has been sent successfully to ${senderEmail}.`,
            confirmButtonText: 'OK'
          });
        })
        .catch(err => {
          console.error('Failed to send email:', err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! Please try again later.',
          });
        });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Empty Reply',
        text: 'Please type a reply before sending.',
      });
    }
  }






}
