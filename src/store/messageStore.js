import {makeAutoObservable, runInAction} from 'mobx';
import {io} from 'socket.io-client';
import {URL} from '@env';

export const ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0xvZ2dlZEluIjp0cnVlLCJ1c2VyX2lkIjoxMDMsInVzZXJfdHlwZSI6InBlcnNvbiIsInVzZXJfbmFtZSI6IkpvaG4iLCJ0ZW5hbnRfaWQiOjExMDEsImlzc3VlZEF0IjoiMjAyNS0wMS0wMlQwODo1MTozOC40OTdaIiwiaWF0IjoxNzM1ODA3ODk4LCJleHAiOjE3MzU4MTE0OTh9.X9qh4iZvJp0rMKmIkLmOZqODHC69D2q9-zSRt6D9sjI';

class Message {
  users = [];
  from = 'global';
  reader = '';
  modalVisible = false;
  uniqueMessage = {};
  replyMessages = [];
  notificationMessages = [];
  receivedMessages = [];
  sentMessages = [];
  draftMessages = [];
  totalReceived = 0;
  totalSent = 0;
  totalDraft = 0;
  nextPage = {};
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

  setModalVisible(value, route) {
    runInAction(() => {
      this.from = route;
      this.modalVisible = value;
    });
  }
  async fetchReceivedMessages(route) {
    if (!this.nextPage[route]) {
      runInAction(() => {
        this.nextPage[route] = 1;
      });
    }
    this.isLoading = true;
    try {
      const response = await fetch(
        `${URL}/messages/${route}/John/${this.nextPage[route]}`,
        {
          headers: {
            'Content-route': 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        },
      );
      if (!response.ok) {
        this.isLoading = false;
        throw new Error(`HTTP Error! status:${response.status}`);
      }
      const data = await response.json();
      runInAction(() => {
        this.isLoading = false;
        this[`${route}Messages`] = [
          ...this[`${route}Messages`],
          ...data.filter(
            msg =>
              !this[`${route}Messages`].some(
                existing => existing.id === msg.id,
              ),
          ),
        ];
        this.nextPage[route] += 1;
      });
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
        console.log('isLoading', this.isLoading);
        console.log('Error fetching Received Messages data', error);
      });
    }
  }
  async fetchSentMessages(route) {
    if (!this.nextPage[route]) {
      runInAction(() => {
        this.nextPage[route] = 1;
      });
    }
    this.isLoading = true;
    try {
      const response = await fetch(
        `${URL}/messages/${route}/John/${this.nextPage[route]}`,
        {
          headers: {
            'Content-route': 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        },
      );
      if (!response.ok) {
        this.isLoading = false;
        throw new Error(`HTTP Error! status:${response.status}`);
      }
      const data = await response.json();
      runInAction(() => {
        this.isLoading = false;
        this[`${route}Messages`] = [
          ...this[`${route}Messages`],
          ...data.filter(
            msg =>
              !this[`${route}Messages`].some(
                existing => existing.id === msg.id,
              ),
          ),
        ];
        this.nextPage[route] += 1;
      });
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
        console.log('Error fetching sent messages Data', error);
      });
    }
  }
  async fetchDraftMessages(route) {
    if (!this.nextPage[route]) {
      runInAction(() => {
        this.nextPage[route] = 1;
      });
    }
    this.isLoading = true;
    try {
      const response = await fetch(
        `${URL}/messages/${route}/John/${this.nextPage[route]}`,
        {
          headers: {
            'Content-route': 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        },
      );
      if (!response.ok) {
        this.isLoading = false;
        throw new Error(`HTTP Error! status:${response.status}`);
      }
      const data = await response.json();
      runInAction(() => {
        this.isLoading = false;
        this[`${route}Messages`] = [
          ...this[`${route}Messages`],
          ...data.filter(
            msg =>
              !this[`${route}Messages`].some(
                existing => existing.id === msg.id,
              ),
          ),
        ];
        this.nextPage[route] += 1;
      });
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
        console.log('Error fetching draft messages Data', error);
      });
    }
  }
  appendMessage(route, message) {
    runInAction(() => {
      if (route === 'received') {
        this.receivedMessages = [message, ...this.receivedMessages];
        this.totalReceived += 1;
      } else if (route === 'sent') {
        this.sentMessages = [message, ...this.sentMessages];
        this.totalSent += 1;
      } else if (route === 'draft') {
        this.draftMessages = [
          message,
          ...this.draftMessages.filter(msg => msg.id !== message.id),
        ];
        this.uniqueMessage = message;
        this.totalDraft += 1;
        if (this.totalDraft > this.draftMessages.length) {
          this.totalDraft = this.draftMessages.length;
        }
      } else if (route === 'reply') {
        this.replyMessages = [message, ...this.replyMessages];
      }
    });
  }
  filterDraftMessages(id) {
    runInAction(() => {
      this.totalDraft -= 1;
      this.draftMessages = this.draftMessages.filter(msg => msg.id !== id);
      this.uniqueMessage = {};
    });
  }
  deleteMessage(id) {
    this.receivedMessages = this.receivedMessages.filter(msg => msg.id !== id);
    this.sentMessages = this.sentMessages.filter(msg => msg.id !== id);
    this.draftMessages = this.draftMessages.filter(msg => msg.id !== id);
  }

  async fetchTotalReceived() {
    try {
      const response = await fetch(`${URL}/messages/total-received/John`, {
        headers: {
          'Content-route': 'application/json',
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP Error! status:${response.status}`);
      }
      const data = await response.json();
      console.log('Mobx count totalReceived', data.total);
      runInAction(() => {
        this.totalReceived = data.total;
      });
    } catch (error) {
      this.isLoading = false;
      console.log('Error in Total Received', error);
    }
  }
  async fetchTotalSent() {
    try {
      // console.log(`${URL}/messages/notification/John`);
      const response = await fetch(`${URL}/messages/total-sent/John`, {
        headers: {
          'Content-route': 'application/json',
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP Error! status:${response.status}`);
      }
      const data = await response.json();
      console.log('Mobx count totalSent', data.total);
      runInAction(() => {
        this.totalSent = data.total;
      });
    } catch (error) {
      this.isLoading = false;
      console.log('Error in Totalsent', error);
    }
  }
  async fetchTotalDraft() {
    try {
      const response = await fetch(`${URL}/messages/total-draft/John`, {
        headers: {
          'Content-route': 'application/json',
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP Error! status:${response.status}`);
      }
      const data = await response.json();
      console.log('Mobx count totalDraft', data.total);
      runInAction(() => {
        this.totalDraft = data.total;
      });
    } catch (error) {
      this.isLoading = false;
      console.log('Error in Totaldraft', error);
    }
  }

  syncReaders(id, user) {
    this.receivedMessages = this.receivedMessages.map(msg =>
      msg.parentid === id
        ? {...msg, readers: msg.readers.filter(reader => reader !== user)}
        : msg,
    );
  }

  async fetchNotificationMessages() {
    try {
      const response = await fetch(`${URL}/messages/notification/John`, {
        headers: {
          'Content-route': 'application/json',
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP Error! status:${response.status}`);
      }
      const data = await response.json();
      runInAction(() => {
        this.notificationMessages = data;
      });
    } catch (error) {
      console.log('Error fetching Notification Count Data', error);
    }
  }
  async fetchReplyMessages(parentId) {
    try {
      const response = await fetch(`${URL}/messages/reply/${parentId}/John`, {
        headers: {
          'Content-route': 'application/json',
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP Error! status:${response.status}`);
      }
      const data = await response.json();
      runInAction(() => {
        this.replyMessages = data;
      });
    } catch (error) {
      console.log('Error fetching Data', error);
    }
  }
  async updateReaders(parentId) {
    try {
      const response = await fetch(
        `${URL}/messages/update-readers/${parentId}/John`,
        {
          method: 'PUT',
          headers: {
            'Content-route': 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
          body: JSON.stringify(parentId),
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP Error! status:${response.status}`);
      }
      const data = await response.json();
      runInAction(() => {
        if (data) {
          this.reader = 'success';
        }
      });
    } catch (error) {
      console.log('Error fetching Data', error);
    }
  }
  async fetchUsers() {
    try {
      const response = await fetch(`${URL}/users`, {
        headers: {
          'Content-route': 'application/json',
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP Error! status:${response.status}`);
      }
      const data = await response.json();
      runInAction(() => {
        this.users = data;
      });
    } catch (error) {
      console.log('Error fetching Users Data', error);
    }
  }
  async fetchUniqueMessage(id) {
    try {
      const response = await fetch(`${URL}/messages/${id}`, {
        headers: {
          'Content-route': 'application/json',
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP Error! status:${response.status}`);
      }
      const data = await response.json();

      runInAction(() => {
        this.uniqueMessage = data;
      });
    } catch (error) {
      console.log('Error fetching uniquemessage Data', error);
    }
  }
}

export const messageStore = new Message();
