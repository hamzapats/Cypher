import {
  type Event,
  type InsertEvent,
  type Notice,
  type InsertNotice,
  type Complaint,
  type InsertComplaint,
  type Feedback,
  type InsertFeedback,
  type Club,
  type Project,
  type ClassSession,
  type AttendanceRecord,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Events
  getAllEvents(): Promise<Event[]>;
  getEvent(id: string): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;

  // Notices
  getAllNotices(): Promise<Notice[]>;
  getNotice(id: string): Promise<Notice | undefined>;
  createNotice(notice: InsertNotice): Promise<Notice>;

  // Complaints
  getAllComplaints(): Promise<Complaint[]>;
  getComplaint(id: string): Promise<Complaint | undefined>;
  createComplaint(complaint: InsertComplaint): Promise<Complaint>;
  updateComplaintStatus(id: string, status: string): Promise<Complaint | undefined>;

  // Feedback
  getAllFeedback(): Promise<Feedback[]>;
  createFeedback(feedback: InsertFeedback): Promise<Feedback>;

  // Clubs
  getAllClubs(): Promise<Club[]>;
  getClub(id: string): Promise<Club | undefined>;

  // Projects
  getAllProjects(): Promise<Project[]>;
  getProjectsByClub(clubId: string): Promise<Project[]>;

  // Timetable
  getAllClasses(): Promise<ClassSession[]>;
  getClassesByDay(day: string): Promise<ClassSession[]>;

  // Attendance
  getAllAttendance(): Promise<AttendanceRecord[]>;
}

export class MemStorage implements IStorage {
  private events: Map<string, Event>;
  private notices: Map<string, Notice>;
  private complaints: Map<string, Complaint>;
  private feedbackList: Map<string, Feedback>;
  private clubs: Map<string, Club>;
  private projects: Map<string, Project>;
  private classes: Map<string, ClassSession>;
  private attendance: Map<string, AttendanceRecord>;

  constructor() {
    this.events = new Map();
    this.notices = new Map();
    this.complaints = new Map();
    this.feedbackList = new Map();
    this.clubs = new Map();
    this.projects = new Map();
    this.classes = new Map();
    this.attendance = new Map();
    this.seedData();
  }

  // Seed with sample data
  private seedData() {
    // Sample Events
    const sampleEvents: Event[] = [
      {
        id: randomUUID(),
        title: "Tech Summit 2024",
        description: "Annual technology conference featuring industry leaders and innovation showcases",
        category: "Academic",
        date: "2024-11-15",
        time: "09:00 AM",
        location: "Main Auditorium",
        imageUrl: null,
        featured: 1,
        createdAt: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        title: "Campus Cricket Championship",
        description: "Inter-department cricket tournament with exciting prizes",
        category: "Sports",
        date: "2024-11-20",
        time: "02:00 PM",
        location: "Sports Complex",
        imageUrl: null,
        featured: 0,
        createdAt: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        title: "Cultural Fest - Harmony",
        description: "Three-day cultural extravaganza with music, dance, and drama performances",
        category: "Cultural",
        date: "2024-12-01",
        time: "05:00 PM",
        location: "Open Air Theatre",
        imageUrl: null,
        featured: 0,
        createdAt: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        title: "Coding Bootcamp",
        description: "Intensive weekend workshop on modern web development technologies",
        category: "Academic",
        date: "2024-11-25",
        time: "10:00 AM",
        location: "Computer Lab A",
        imageUrl: null,
        featured: 0,
        createdAt: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        title: "Social Service Drive",
        description: "Community outreach program focusing on local neighborhood development",
        category: "Social",
        date: "2024-11-18",
        time: "08:00 AM",
        location: "Campus Gate",
        imageUrl: null,
        featured: 0,
        createdAt: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        title: "Basketball Tournament",
        description: "Annual inter-college basketball championship",
        category: "Sports",
        date: "2024-12-05",
        time: "03:00 PM",
        location: "Indoor Stadium",
        imageUrl: null,
        featured: 0,
        createdAt: new Date().toISOString(),
      },
    ];

    sampleEvents.forEach((event) => this.events.set(event.id, event));

    // Sample Notices
    const sampleNotices: Notice[] = [
      {
        id: randomUUID(),
        title: "Exam Schedule Released",
        content: "The final examination schedule for Fall 2024 has been published. Please check the academic portal for details.",
        category: "Academic",
        priority: "High",
        createdAt: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        title: "Library Hours Extended",
        content: "Library will remain open 24/7 during the examination period starting from November 20th.",
        category: "General",
        priority: "Medium",
        createdAt: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        title: "Campus WiFi Maintenance",
        content: "Network maintenance scheduled for this Saturday from 2 AM to 6 AM. Services may be temporarily unavailable.",
        category: "Administrative",
        priority: "Medium",
        createdAt: new Date().toISOString(),
      },
    ];

    sampleNotices.forEach((notice) => this.notices.set(notice.id, notice));

    // Sample Clubs
    const sampleClubs: Club[] = [
      {
        id: randomUUID(),
        name: "Tech Innovation Club",
        category: "Technology",
        description: "Building innovative tech solutions and exploring emerging technologies",
        memberCount: 85,
        logo: "TI",
        isActive: true,
      },
      {
        id: randomUUID(),
        name: "Creative Arts Society",
        category: "Arts",
        description: "Celebrating creativity through various art forms and exhibitions",
        memberCount: 62,
        logo: "CA",
        isActive: true,
      },
      {
        id: randomUUID(),
        name: "Music Ensemble",
        category: "Music",
        description: "Creating harmonious melodies and performing at campus events",
        memberCount: 45,
        logo: "ME",
        isActive: true,
      },
      {
        id: randomUUID(),
        name: "Robotics Club",
        category: "Technology",
        description: "Designing and building autonomous robots for competitions",
        memberCount: 54,
        logo: "RC",
        isActive: true,
      },
      {
        id: randomUUID(),
        name: "Photography Club",
        category: "Arts",
        description: "Capturing moments and sharing visual stories through photography",
        memberCount: 71,
        logo: "PC",
        isActive: true,
      },
      {
        id: randomUUID(),
        name: "Literary Society",
        category: "Literature",
        description: "Exploring literature, creative writing, and public speaking",
        memberCount: 38,
        logo: "LS",
        isActive: true,
      },
    ];

    sampleClubs.forEach((club) => this.clubs.set(club.id, club));

    // Sample Projects
    const clubIds = Array.from(this.clubs.keys());
    const sampleProjects: Project[] = [
      {
        id: randomUUID(),
        name: "Campus Mobile App",
        clubId: clubIds[0] || "1",
        description: "Developing a comprehensive mobile application for campus services",
        status: "In Progress",
        teamMembers: ["Alice", "Bob", "Charlie", "Diana"],
        startDate: "2024-09-01",
      },
      {
        id: randomUUID(),
        name: "Annual Art Exhibition",
        clubId: clubIds[1] || "2",
        description: "Organizing the yearly showcase of student artwork",
        status: "Planning",
        teamMembers: ["Emma", "Frank", "Grace"],
        startDate: "2024-10-15",
      },
      {
        id: randomUUID(),
        name: "Winter Concert Series",
        clubId: clubIds[2] || "3",
        description: "Planning and executing multiple musical performances",
        status: "In Progress",
        teamMembers: ["Henry", "Iris", "Jack", "Kate", "Liam"],
        startDate: "2024-08-20",
      },
      {
        id: randomUUID(),
        name: "Autonomous Rover",
        clubId: clubIds[3] || "4",
        description: "Building a self-navigating rover for the inter-college competition",
        status: "In Progress",
        teamMembers: ["Mike", "Nina", "Oscar"],
        startDate: "2024-07-01",
      },
      {
        id: randomUUID(),
        name: "Campus Photo Documentary",
        clubId: clubIds[4] || "5",
        description: "Creating a visual documentation of campus life through the year",
        status: "Completed",
        teamMembers: ["Paul", "Quinn", "Rachel"],
        startDate: "2024-01-10",
      },
    ];

    sampleProjects.forEach((project) => this.projects.set(project.id, project));

    // Sample Timetable
    const sampleClasses: ClassSession[] = [
      {
        id: randomUUID(),
        day: "Monday",
        startTime: "09:00",
        endTime: "10:30",
        subject: "Data Structures",
        room: "CS-101",
        faculty: "Dr. Smith",
        type: "Lecture",
      },
      {
        id: randomUUID(),
        day: "Monday",
        startTime: "11:00",
        endTime: "12:30",
        subject: "Database Systems",
        room: "CS-Lab-1",
        faculty: "Prof. Johnson",
        type: "Lab",
      },
      {
        id: randomUUID(),
        day: "Tuesday",
        startTime: "10:00",
        endTime: "11:30",
        subject: "Web Development",
        room: "CS-202",
        faculty: "Dr. Williams",
        type: "Lecture",
      },
      {
        id: randomUUID(),
        day: "Tuesday",
        startTime: "14:00",
        endTime: "15:30",
        subject: "Operating Systems",
        room: "CS-103",
        faculty: "Prof. Brown",
        type: "Tutorial",
      },
      {
        id: randomUUID(),
        day: "Wednesday",
        startTime: "09:00",
        endTime: "10:30",
        subject: "Algorithms",
        room: "CS-104",
        faculty: "Dr. Davis",
        type: "Lecture",
      },
      {
        id: randomUUID(),
        day: "Thursday",
        startTime: "11:00",
        endTime: "12:30",
        subject: "Data Structures",
        room: "CS-Lab-2",
        faculty: "Dr. Smith",
        type: "Lab",
      },
      {
        id: randomUUID(),
        day: "Friday",
        startTime: "10:00",
        endTime: "11:30",
        subject: "Web Development",
        room: "CS-Lab-3",
        faculty: "Dr. Williams",
        type: "Lab",
      },
    ];

    sampleClasses.forEach((classSession) => this.classes.set(classSession.id, classSession));

    // Sample Attendance
    const sampleAttendance: AttendanceRecord[] = [
      { subject: "Data Structures", total: 40, attended: 36, percentage: 90 },
      { subject: "Database Systems", total: 38, attended: 34, percentage: 89 },
      { subject: "Web Development", total: 42, attended: 38, percentage: 90 },
      { subject: "Operating Systems", total: 40, attended: 32, percentage: 80 },
      { subject: "Algorithms", total: 36, attended: 30, percentage: 83 },
    ];

    sampleAttendance.forEach((record) => this.attendance.set(record.subject, record));
  }

  // Events
  async getAllEvents(): Promise<Event[]> {
    return Array.from(this.events.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getEvent(id: string): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = randomUUID();
    const event: Event = {
      ...insertEvent,
      id,
      createdAt: new Date().toISOString(),
    };
    this.events.set(id, event);
    return event;
  }

  // Notices
  async getAllNotices(): Promise<Notice[]> {
    return Array.from(this.notices.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getNotice(id: string): Promise<Notice | undefined> {
    return this.notices.get(id);
  }

  async createNotice(insertNotice: InsertNotice): Promise<Notice> {
    const id = randomUUID();
    const notice: Notice = {
      ...insertNotice,
      id,
      createdAt: new Date().toISOString(),
    };
    this.notices.set(id, notice);
    return notice;
  }

  // Complaints
  async getAllComplaints(): Promise<Complaint[]> {
    return Array.from(this.complaints.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getComplaint(id: string): Promise<Complaint | undefined> {
    return this.complaints.get(id);
  }

  async createComplaint(insertComplaint: InsertComplaint): Promise<Complaint> {
    const id = randomUUID();
    const now = new Date().toISOString();
    const complaint: Complaint = {
      ...insertComplaint,
      id,
      status: "Pending",
      createdAt: now,
      updatedAt: now,
    };
    this.complaints.set(id, complaint);
    return complaint;
  }

  async updateComplaintStatus(id: string, status: string): Promise<Complaint | undefined> {
    const complaint = this.complaints.get(id);
    if (!complaint) return undefined;

    const updated: Complaint = {
      ...complaint,
      status,
      updatedAt: new Date().toISOString(),
    };
    this.complaints.set(id, updated);
    return updated;
  }

  // Feedback
  async getAllFeedback(): Promise<Feedback[]> {
    return Array.from(this.feedbackList.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async createFeedback(insertFeedback: InsertFeedback): Promise<Feedback> {
    const id = randomUUID();
    const feedback: Feedback = {
      ...insertFeedback,
      id,
      createdAt: new Date().toISOString(),
    };
    this.feedbackList.set(id, feedback);
    return feedback;
  }

  // Clubs
  async getAllClubs(): Promise<Club[]> {
    return Array.from(this.clubs.values());
  }

  async getClub(id: string): Promise<Club | undefined> {
    return this.clubs.get(id);
  }

  // Projects
  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProjectsByClub(clubId: string): Promise<Project[]> {
    return Array.from(this.projects.values()).filter((p) => p.clubId === clubId);
  }

  // Timetable
  async getAllClasses(): Promise<ClassSession[]> {
    return Array.from(this.classes.values());
  }

  async getClassesByDay(day: string): Promise<ClassSession[]> {
    return Array.from(this.classes.values()).filter((c) => c.day === day);
  }

  // Attendance
  async getAllAttendance(): Promise<AttendanceRecord[]> {
    return Array.from(this.attendance.values());
  }
}

export const storage = new MemStorage();
