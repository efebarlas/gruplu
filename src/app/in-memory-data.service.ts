import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const users: User[] = [
    {username: 'a', password: 'a'},
    {username: 'b', password: 'b'},
    {username: 'c', password: 'c'},
    {username: 'd', password: 'd'},
    {username: 'e', password: 'e'},
    ];
    return {users};
  }
}
