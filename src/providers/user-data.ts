import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Injectable()
export class UserData {
  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
  HAS_SERVER_ADDR = "hasServerAddr";

  constructor(
    public events: Events,
    public storage: Storage
  ) {}

  hasFavorite(sessionName: string): boolean {
    return (this._favorites.indexOf(sessionName) > -1);
  };

  addFavorite(sessionName: string): void {
    this._favorites.push(sessionName);
  };

  removeFavorite(sessionName: string): void {
    let index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  };

  login(username: string): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:login');
  };

  signup(username: string): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:signup');
  };

  logout(): void {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('username');
    this.events.publish('user:logout');
  };

  setUsername(username: string): void {
    this.storage.set('username', username);
  };

  setServerAddr(serverAddr: string): void {
    this.storage.set(this.HAS_SERVER_ADDR, true);
    this.storage.set('serverAddr', serverAddr);
  };

  setSelectedMeeting(meeting: any): void {
    this.storage.set('selectedMeeting', meeting);
  }

  cachePdfData(pdfSrc: string, data: Uint8Array) {
    this.storage.set(pdfSrc, data);
  }

  getCachedPdfData(pdfSrc: string) {
    return this.storage.get(pdfSrc).then((value)=> {
      return value;
    });
  }

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  };
  getServerAddr(): Promise<string> {
    return this.storage.get('serverAddr').then((value) => {
      return value;
    });
  };
  getSelectedMeeting() : Promise<any> {
    return this.storage.get('selectedMeeting').then((value)=> {
      return value;
    });
  }
  hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };

  hasServerAddr(): Promise<boolean> {
    return this.storage.get(this.HAS_SERVER_ADDR).then((value)=>{
      return (value === true);
    });
  }
  
  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  };
}
