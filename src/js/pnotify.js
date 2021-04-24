import { info } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import * as Confirm from '@pnotify/confirm';
import '@pnotify/confirm/dist/PNotifyConfirm.css';
import {error} from '@pnotify/core';

function notification() {
  info({
    title: 'Запрос не точен',
    text: 'Результат ввода более 10 стран. Пожалуйста введите более конкретный запрос',
    delay: 3000,
    modules: new Map([
      [
        Confirm,
        {
          confirm: true,
          buttons: [
            {
              text: 'Ok',
              primary: true,
              click: notice => {
                notice.close(500);
              },
            },
          ],
        },
      ],
    ]),
  });
}

function myError(){
  error({
  text: 'По вашему запросу картинок нет',
  delay: 2000
})};

export {notification, myError};

