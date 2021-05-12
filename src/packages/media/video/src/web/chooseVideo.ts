import { ChooseVideoOptions } from '../types';
import { CONTAINER_NAME } from '@utils/constant';
import { normalize } from '../common';

function inputCreateAndAppend(multiple: boolean) {
  const inputElement: any = document.createElement('INPUT');
  inputElement.name = 'file';
  inputElement.id = `input-${ Math.random() * 1e8}`;
  inputElement.type = 'file';
  multiple && inputElement.setAttribute('multiple', 'multiple');
  inputElement.style.display = 'none';
  inputElement.setAttribute('accept', 'video/*');
  document.body.appendChild(inputElement);
  return inputElement;
}

function transformBase64(files: any[]): Promise<any []> {
  return new Promise((resolve, reject) => {
    !files.length && reject();
    const base64Array: string[] = [];
    let count = 0;
    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        // @ts-ignore
        base64Array.push(e.target.result);
      };
      reader.onloadend = () => {
        count++;
        if (count === files.length) {
          resolve(base64Array);
        }
      };
    });
  });
}

const chooseVideo = normalize.chooseVideo((args: ChooseVideoOptions = {}) => {
  const { success = () => {}, fail = () => {}, complete = () => {} } = args;
  try {
    const inputElement = inputCreateAndAppend(false);
    let files: any[] = [];
    inputElement.addEventListener(
      'change',
      (e) => {
        files = e.target.files;
        transformBase64(files).then((base64Array) => {
          const res = {
            tempFilePath: base64Array[0],
            size: base64Array[0].length,
            files,
          };
          success(res as any);
          complete(res as any);
        }).finally(() => inputElement.remove && inputElement.remove());
      },
      false,
    );
    const MouseEvents = document.createEvent('MouseEvents');
    MouseEvents.initEvent('click', true, true);
    inputElement.dispatchEvent(MouseEvents);
  } catch (e) {
    fail(e);
    complete(e);
  }
}, CONTAINER_NAME.WEB);

export default chooseVideo;