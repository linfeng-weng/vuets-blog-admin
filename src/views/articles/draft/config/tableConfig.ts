export const tableOption = {
  align: 'center',
  tableHead: [
    {
      type: 'index',
      label: '序号',
      width: '100'
    },

    {
      prop: 'title',
      label: '标题',
      width: '350',
      showOverflowTooltip: true
    },
    {
      prop: 'category',
      label: '分类'
    },
    {
      prop: 'tags',
      label: '标签',
      showOverflowTooltip: true
    },
    {
      prop: 'create_date',
      label: '创建时间'
    },
    {
      prop: 'update_date',
      label: '更新时间'
    },
    {
      editDeleteBtn: true,
      label: '操作'
    }
  ]
}
