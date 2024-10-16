import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { root } from '../shared/constants';
import { Observable } from 'rxjs';
import { ScheduleDTO } from '../pages/admin/edit-schedule/ScheduleDTO';
import emailjs from 'emailjs-com';





@Injectable({
  providedIn: 'root',
})
export class AhmadService {
  private userId = 'bmxEC6kifqCWeT4A1';
// Replace with your EmailJS user ID


  constructor(private http: HttpClient) {
    emailjs.init(this.userId); // Initialize EmailJS with your user ID
  }



  getAllMessages(): Observable<any[]> {
    return this.http.get<any[]>("https://localhost:7280/api/Contacts");
  }


  // Method to send emails
  sendEmail(toName: string, fromName: string, to: string, message: string): Promise<any> {
    const templateParams = {
      to_name: toName,
      from_name: fromName,
      message,
    };

    return emailjs.send('service_21ldtmr', 'template_g3x5tjk', templateParams)
      .then(response => {
        console.log('Email sent successfully:', response);
        return response;
      })
      .catch(error => {
        console.error('Error sending email:', error);
        throw error; // Rethrow error for handling in component
      });
  }


  addContact(data: any): Observable<any> {
    debugger
    return this.http.post<any>("https://localhost:7280/api/Contacts", data)
  }
  private apiUrl = "https://localhost:7280/api/";


  getClassById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}classCrud/getClass/${id}`);
  }

  updateClass(id: number, classItem: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}classCrud/putClass/${id}`, classItem, {
      headers: {
        'Content-Type': 'application/json-patch+json', // Ensure correct header
        'Accept': '*/*'
      }
    });
  }

  deleteClass(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}classCrud/deleteClass/${id}`);
  }





  ////////////////////////// for scedule
  

  addSchedule(scheduleData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}scdule/AddNewClassSchedule`, scheduleData);
  }




 



  getScheduleById(id: number): Observable<any> {
    return this.http.get<any>(`https://localhost:7280/api/scdule/GetScheduleByID/${id}`);
  }


  updateSchedule(id: number, scheduleData: ScheduleDTO): Observable<any> {
    return this.http.put(`  https://localhost:7280/api/scdule/UpdateClassSchedule/${id}`, scheduleData);
  }


  // New method to get all schedules
  getAllSchedules(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}scdule/GetAllSchedules`); // Adjust the endpoint as needed
  }

  deleteSchedule(id: number): Observable<any> {
    return this.http.delete<any>(`https://localhost:7280/api/scdule/DeleteClassSchedule/${id}`);
  }


}
