import ElementPlus from 'element-plus'
import type { App } from 'vue'
import 'element-plus/dist/index.css'

export default {
  install (app: App) {
    app.use(ElementPlus, { size: 'small', zIndex: 2000 })
  }
}
