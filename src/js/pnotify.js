import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/confirm/dist/PNotifyConfirm.css';
import { error } from '@pnotify/core';

function myError() {
  error({
    text: 'По вашему запросу картинок нет',
    delay: 2000,
  });
}

export default myError;
