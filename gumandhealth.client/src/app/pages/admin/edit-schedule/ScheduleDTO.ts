export interface ScheduleDTO {
  id: number;
  classId: number;
  className: string;      // Add this line
  availableDay: string;
  startTime: string;
  endTime: string;
  instructorId: number;
  instructorName: string;  // Add this line
}
