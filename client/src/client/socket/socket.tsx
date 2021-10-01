import io from 'socket.io-client';
import { UpdateSettings } from '../store/actions';
import { store } from '../store/store';

export const socket = io('http://localhost:5000');

socket.on('connect', () => {
  console.log('connected');
  socket.on('updateSettings', (data) => {
    store.dispatch(UpdateSettings(data));
  });
});
