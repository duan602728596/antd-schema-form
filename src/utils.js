import { message } from 'antd';

/* 复制 */
export function handleCopyTextClick(id: string, messageStr: string, event: Event): void{
  const range: Object = document.createRange();
  range.selectNode(document.getElementById(id));

  const selection: Object = window.getSelection();

  if(selection.rangeCount > 0) selection.removeAllRanges();

  selection.addRange(range);
  document.execCommand('copy');
  message.info(messageStr);
}