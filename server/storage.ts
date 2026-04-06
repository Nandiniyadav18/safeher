import { 
  type NewsArticle, 
  type InsertNewsArticle,
  type EmergencyContact,
  type InsertEmergencyContact,
  type ShareEvent,
  type InsertShareEvent
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getAllNews(): Promise<NewsArticle[]>;
  createNewsArticle(article: InsertNewsArticle): Promise<NewsArticle>;
  
  getAllContacts(): Promise<EmergencyContact[]>;
  createContact(contact: InsertEmergencyContact): Promise<EmergencyContact>;
  deleteContact(id: string): Promise<boolean>;
  
  recordShareEvent(event: InsertShareEvent): Promise<ShareEvent>;
  getShareStats(): Promise<{ platform: string; count: number }[]>;
}

export class MemStorage implements IStorage {
  private newsArticles: Map<string, NewsArticle>;
  private emergencyContacts: Map<string, EmergencyContact>;
  private shareEvents: Map<string, ShareEvent>;

  constructor() {
    this.newsArticles = new Map();
    this.emergencyContacts = new Map();
    this.shareEvents = new Map();
    this.seedInitialData();
  }

  private seedInitialData() {
    const initialNews: NewsArticle[] = [
      {
        id: randomUUID(),
        title: "Safety Tips for Late Night Travel",
        description: "Essential precautions every woman should take when traveling alone after dark. Share your location, stay in well-lit areas, and trust your instincts.",
        category: "Safety Tips",
        imageUrl: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=300&fit=crop",
        publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        source: "SafeHer Team",
      },
      {
        id: randomUUID(),
        title: "New Safety Zone Mapping in Delhi",
        description: "Interactive safety maps now available for major metropolitan areas, highlighting well-lit routes and emergency service locations.",
        category: "Alerts",
        imageUrl: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&h=300&fit=crop",
        publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        source: "Safety Analytics",
      },
      {
        id: randomUUID(),
        title: "Self-Defense Workshop This Weekend",
        description: "Free self-defense classes being offered for women of all ages. Learn basic techniques to protect yourself in emergency situations.",
        category: "Resources",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
        publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        source: "Community Center",
      },
      {
        id: randomUUID(),
        title: "Understanding Your Legal Rights",
        description: "Know your rights and the legal protections available to you. Information on filing complaints and accessing legal aid services.",
        category: "Resources",
        imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop",
        publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        source: "Legal Aid Foundation",
      },
      {
        id: randomUUID(),
        title: "Emergency Hotlines You Should Know",
        description: "Comprehensive list of emergency numbers including police, women's helpline, ambulance, and mental health support services.",
        category: "Safety Tips",
        imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=300&fit=crop",
        publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        source: "SafeHer Team",
      },
      {
        id: randomUUID(),
        title: "Stay Alert: Recent Safety Incidents",
        description: "Reports of increased activity in certain areas. Stay vigilant, travel in groups when possible, and report suspicious behavior immediately.",
        category: "Alerts",
        imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop",
        publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
        source: "City Watch",
      },
    ];

    initialNews.forEach(article => {
      this.newsArticles.set(article.id, article);
    });
  }

  async getAllNews(): Promise<NewsArticle[]> {
    return Array.from(this.newsArticles.values()).sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  async createNewsArticle(insertArticle: InsertNewsArticle): Promise<NewsArticle> {
    const id = randomUUID();
    const article: NewsArticle = {
      ...insertArticle,
      id,
      publishedAt: new Date(),
    };
    this.newsArticles.set(id, article);
    return article;
  }

  async getAllContacts(): Promise<EmergencyContact[]> {
    return Array.from(this.emergencyContacts.values());
  }

  async createContact(insertContact: InsertEmergencyContact): Promise<EmergencyContact> {
    const id = randomUUID();
    const contact: EmergencyContact = { ...insertContact, id };
    this.emergencyContacts.set(id, contact);
    return contact;
  }

  async deleteContact(id: string): Promise<boolean> {
    return this.emergencyContacts.delete(id);
  }

  async recordShareEvent(insertEvent: InsertShareEvent): Promise<ShareEvent> {
    const id = randomUUID();
    const event: ShareEvent = {
      ...insertEvent,
      id,
      sharedAt: new Date(),
    };
    this.shareEvents.set(id, event);
    return event;
  }

  async getShareStats(): Promise<{ platform: string; count: number }[]> {
    const stats = new Map<string, number>();
    
    for (const event of this.shareEvents.values()) {
      const count = stats.get(event.platform) || 0;
      stats.set(event.platform, count + 1);
    }
    
    return Array.from(stats.entries()).map(([platform, count]) => ({
      platform,
      count,
    }));
  }
}

export const storage = new MemStorage();
