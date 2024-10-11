import { Component, Injectable } from '@angular/core';
interface Tep {
  tepId: number;
  title: string;
  body: string;
  image: string;  // حقل الصورة
}

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrl: './tips.component.css'
})
export class TipsComponent {

  healthSteps: Tep[] = [
    {
      tepId: 1,
      title: "Stay Hydrated",
      body: "Drinking water throughout the day is essential for maintaining good health and staying energized.",
      image: "/assets/img/hydration.jpg"  
    },
    {
      tepId: 2,
      title: "Exercise Regularly",
      body: "Engaging in at least 30 minutes of moderate physical activity every day helps improve physical and mental well-being.",
      image: "assets/img/exercise.jpg"
    },
    {
      tepId: 3,
      title: "Get Enough Sleep",
      body: "Adequate sleep is crucial for recovery, mental clarity, and overall health. Aim for 7-9 hours of quality sleep each night.",
      image: "assets/img/sleep.png"
    },
    {
      tepId: 4,
      title: "Eat a Balanced Diet",
      body: "Consume a variety of nutrients by including fruits, vegetables, whole grains, and lean proteins in your daily diet.",
      image: "assets/img/balanced-diet.png"
    },
    {
      tepId: 5,
      title: "Manage Stress",
      body: "Practice stress-relief techniques such as meditation, deep breathing, or yoga to maintain emotional balance.",
      image: "assets/img/stress-management.jpg"
    },
    {
      tepId: 6,
      title: "Eat Small, Frequent Meals",
      body: "Eating smaller meals more frequently throughout the day can help keep your energy levels stable and prevent overeating.",
      image: "assets/img/small-meals.png"
    }


  ];

  constructor() { }
}
