import {makeAutoObservable, runInAction} from 'mobx';
import {io} from 'socket.io-client';

export const URL = 'http://192.168.0.197:3000';

class Message {
  users = [];
  receivedMessages = [];
  currentPage = 0;
  isLoading = false;
  socket = io('wss://procg.viscorp.app', {
    query: {
      key: 'John',
    },
    path: '/socket.io/',
    transports: ['websocket'],
  });
  constructor() {
    makeAutoObservable(this);
  }

  // async fetchNotificationMessage(username, pageNumber) {
  //   this.isLoading = true;
  //   const nextPage = pageNumber + 1;
  //   try {
  //     console.log(`${URL}/messages/received/${String(username)}/${nextPage}`);
  //     const response = await fetch(
  //       `${URL}/messages/received/${username}/${nextPage}`,
  //     );
  //     if (!response.ok) {
  //       throw new Error(`HTTP Error! status:${response.status}`);
  //     }
  //     const data = await response.json();
  //     console.log(data);
  //     runInAction(() => {
  //       this.receivedMessages = [...this.receivedMessages, ...data];
  //       this.isLoading = false;
  //       this.currentPage = nextPage;
  //     });
  //   } catch (error) {
  //     this.isLoading = false;
  //     console.log('Error fetching Data', error);
  //   }
  // }
  async fetchUsers() {
    try {
      const response = await fetch(`${URL}/users`);
      if (!response.ok) {
        throw new Error(`HTTP Error! status:${response.status}`);
      }
      const data = await response.json();
      runInAction(() => {
        this.users = data;
      });
    } catch (error) {
      console.log('Error fetching Data', error);
    }
  }
}

export const messageStore = new Message();
