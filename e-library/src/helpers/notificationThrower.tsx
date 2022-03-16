import React from 'react';
import { Store } from 'react-notifications-component';

interface props {
  type: 'success' | 'danger' | 'info' | 'warning';
  title: string;
  message?: string;
  duration: number;
}

const notificationThrower = (props: props) => {
  const { title, message, type, duration } = props;
  Store.addNotification({
    title: title,
    message: message,
    type: type,
    insert: 'bottom',
    container: 'bottom-right',
    animationIn: ['animate__animated animate__bounceInRight'],
    animationOut: ['animate__animated animate__backOutRight'],
    dismiss: {
      duration: duration,
      onScreen: false,
    },
  });
};

export default notificationThrower;
