import { type LocalSurveyData } from '../types/survey';

export class LocalStorageManager {
  private static STORAGE_KEY = 'climate_anxiety_survey_data';
  private static SESSION_ID_KEY = 'climate_anxiety_session_id';
  private static SURVEY_VERSION_KEY = 'climate_anxiety_survey_version';

  static saveSurveyData(data: LocalSurveyData): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save survey data:', error);
    }
  }

  static loadSurveyData(): LocalSurveyData | null {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load survey data:', error);
      return null;
    }
  }

  static clearSurveyData(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.SESSION_ID_KEY);
    localStorage.removeItem(this.SURVEY_VERSION_KEY);
  }

  static generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  static getSessionId(): string {
    let sessionId = localStorage.getItem(this.SESSION_ID_KEY);
    if (!sessionId) {
      sessionId = this.generateSessionId();
      localStorage.setItem(this.SESSION_ID_KEY, sessionId);
    }
    return sessionId;
  }

  static isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__localStorage_test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  }

  static migrateLegacyData(data: any): LocalSurveyData {
    // Handle future changes to data structure
    if (!data.version) {
      return {
        ...data,
        version: '1.0.0',
        sessionId: data.sessionId || this.generateSessionId()
      };
    }
    return data;
  }
}
