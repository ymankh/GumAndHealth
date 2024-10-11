import { Injectable } from '@angular/core';

interface Tep {
  tepId: number;
  title: string;
  body: string;
}
@Injectable({
  providedIn: 'root',
})
export class TepsService {
  // Define the Tep interface
  healthSteps: Tep[] = [
    {
      tepId: 1,
      title: 'Stay Hydrated',
      body: 'Drinking water throughout the day is essential for maintaining good health and staying energized.',
    },
    {
      tepId: 2,
      title: 'Exercise Regularly',
      body: 'Engaging in at least 30 minutes of moderate physical activity every day helps improve physical and mental well-being.',
    },
    {
      tepId: 3,
      title: 'Get Enough Sleep',
      body: 'Adequate sleep is crucial for recovery, mental clarity, and overall health. Aim for 7-9 hours of quality sleep each night.',
    },
    {
      tepId: 4,
      title: 'Eat a Balanced Diet',
      body: 'Consume a variety of nutrients by including fruits, vegetables, whole grains, and lean proteins in your daily diet.',
    },
    {
      tepId: 5,
      title: 'Manage Stress',
      body: 'Practice stress-relief techniques such as meditation, deep breathing, or yoga to maintain emotional balance.',
    },
  ];

  // You can now use the healthSteps array as needed in your TypeScript project.

  constructor() {}
}
