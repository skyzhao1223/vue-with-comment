/* @flow */

// 引入转换数组的方法。
import { toArray } from '../util/index'

// 导出初始化方法，入参为Vue实例。
export function initUse (Vue: GlobalAPI) {
  
  // 在传入的Vue实例上添加use方法。
  Vue.use = function (plugin: Function | Object) {
    
    // 获取已安装的插件列表，若没有则添加为新数组。
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    
    // 判断当前插件是否存在，若存在则直接返回Vue实例。
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // 将入参转换为数组。
    const args = toArray(arguments, 1)
    
    // 向参数数组首部添加当前Vue实例。
    args.unshift(this)
    
    // 若当前插件定义了install方法，则执行其install方法，传递入参，并使其this指向为该组件自身。
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
      
    // 若传入插件本身为函数，直接执行该函数，入参，使其this指向null。
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    
    // 向Vue实例的已安装组件数组中添加该组件。
    installedPlugins.push(plugin)
    
    // 返回Vue实例
    return this
  }
}
