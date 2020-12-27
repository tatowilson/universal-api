import { isDingdingMiniapp, isMiniApp } from 'universal-env';
import { promisify } from '../../../utils/promisify';
import { ShowModalOptions, showModalRes } from './types';

/**
 * modal返回值格式化
 * @param res
 */
const formatResponse = (res): showModalRes => {
  // success用于兼容支付宝alert
  const confirm = res.confirm != undefined ? res.confirm : true;
  const result = {
    confirm,
    cancel: !confirm
  };
  return result;
};

/**
 * modal参数格式化
 * @param options
 */
function styleOptions(options: ShowModalOptions = {}) {
  const args: any = {
    title: options.title || '',
    content: options.content || '',
    showCancel: options.showCancel != undefined ? options.showCancel : true,
    confirmText: options.confirmText || '确定',
    cancelText: options.cancelText || '取消',
  };
  return {
    ...args,
    success: res => {
      options.success && options.success(formatResponse(res));
    },
    complete: res => {
      options.complete && options.complete(res);
    },
    fail: err => {
      options.fail && options.fail(err);
    }
  };
}

export function initApi(api) {
  return (args: ShowModalOptions) => {
    return promisify(api)(styleOptions(args)).then(formatResponse);
  };
}