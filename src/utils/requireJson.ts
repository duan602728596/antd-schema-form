import { isModule } from './type';

/**
 * 加载json文件
 *
 * typescript下，json包含default
 * babel下，json不包含default
 */
function requireJson(modules: any): any {
  if (isModule(modules) && 'default' in modules) {
    return modules.default;
  } else {
    return modules;
  }
}

export default requireJson;