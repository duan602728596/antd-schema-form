import { message } from 'antd';

/* 复制 */
export function handleCopyTextClick(id, messageStr, event) {
  const range = document.createRange();
  const selection = window.getSelection();

  range.selectNode(document.getElementById(id));

  if (selection.rangeCount > 0) {
    selection.removeAllRanges();
  }

  selection.addRange(range);
  document.execCommand('copy');
  message.info(messageStr);
}