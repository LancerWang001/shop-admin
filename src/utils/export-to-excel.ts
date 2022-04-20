/**
 * excel 相关工具方法
 */
import xlsx, { BookType } from 'xlsx'

export const jsonToExcel = (options: {
  data: any[],
  header?: Record<string, string>,
  fileName: string,
  bookType?: BookType
}) => {
  // 1. 创建一个工作簿（workbook）
  const wb = xlsx.utils.book_new()
  // 2. 创建工作表（worksheet）
  if (options.header) {
    options.data = options.data.map((item) => Object.entries(item).reduce((acc, [k, v]) => {
      if (options.header?.[k]) acc[options.header[k]] = v
      else acc[k] = v
      return acc
    }, {} as Record<string, any>))
  }
  const ws = xlsx.utils.json_to_sheet(options.data)
  // 3. 把工作表放到工作簿中
  xlsx.utils.book_append_sheet(wb, ws)
  // .4 生成数据保存
  xlsx.writeFile(wb, options.fileName, {
    bookType: options.bookType ?? 'xlsx'
  })
}
