<template>
  <page-container>
    <app-card>
      <template #header>
        数据筛选
      </template>
      <el-form
        :inline="true"
        ref="form"
        :model="listParams"
        :disabled="listLoading"
        @submit.prevent="handleQuery"
      >
        <el-form-item label="状态">
          <el-select
            v-model="listParams.is_show"
            placeholder="请选择"
            clearable
          >
            <el-option
              label="全部"
              value=""
            />
            <el-option
              label="显示"
              :value="1"
            />
            <el-option
              label="不显示"
              :value="0"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="规则名称">
          <el-input
            v-model="listParams.keyword"
            clearable
            placeholder="请输入规则名称"
          />
        </el-form-item>
        <el-form-item>
          <el-button native-type="submit">
            查询
          </el-button>
        </el-form-item>
      </el-form>
    </app-card>
    <app-card>
      <template #header>
        <el-button
          type="primary"
          @click="formVisible = true"
        >
          添加规则
        </el-button>
      </template>
      <!--
        启用树菜单：
          1. data 数据需要是树结构
          2. 给 vxe-table 组件设置 row-id
          3. 给 vxe-column 设置 tree-node
       -->
      <vxe-table
        :data="list"
        row-id="id"
        :tree-config="{ children: 'children' }"
        v-loading="listLoading"
      >
        <vxe-column
          field="id"
          title="ID"
        />
        <vxe-column
          field="menu_name"
          title="名称"
          tree-node
        />
        <vxe-column
          title="接口路径"
        >
          <template #default="{ row }">
            {{ row.api_url ? `[${row.methods}] ${row.api_url}` : '' }}
          </template>
        </vxe-column>
        <vxe-column
          field="unique_auth"
          title="前端权限"
        />
        <vxe-column
          field="menu_path"
          title="页面路由"
        />
        <vxe-column title="状态">
          <template #default="{ row }">
            <el-switch
              v-model="row.is_show"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              :loading="row.statusLoading"
              @change="handleStatusChange(row)"
            />
          </template>
        </vxe-column>
        <vxe-column
          title="操作"
          min-width="100"
        >
          <template #default="scope">
            <el-button
              type="text"
              @click="handleCreate(scope.row.id)"
            >
              添加规则
            </el-button>
            <el-button
              type="text"
              @click="handleUpdate(scope.row.id)"
            >
              编辑
            </el-button>
            <el-popconfirm
              title="确认删除吗？"
              @confirm="handleDelete(scope.row.id)"
            >
              <template #reference>
                <el-button type="text">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </vxe-column>
      </vxe-table>
    </app-card>
  </page-container>
  <rule-form
    v-model="formVisible"
    v-model:rule-id="ruleId"
    v-model:pid="pid"
    @success="handleFormSuccess"
  />
</template>

<script setup lang="ts">
import { changeRuleStatus, deleteMenu, getMenus } from '@/api/rules'
import { Rule, RuleQueryParams } from '@/api/types/rules'
import { onMounted, reactive, ref } from '@vue/runtime-core'
import RuleForm from './RuleForm.vue'

const ruleId = ref(0)
const pid = ref(0)
const formVisible = ref(false)
const list = ref<Rule[]>([])
const listLoading = ref(false)
const listParams = reactive<RuleQueryParams>({
  is_show: '',
  keyword: ''
})

const loadRules = async () => {
  try {
    listLoading.value = true
    list.value = await getMenus(listParams)
  } finally {
    listLoading.value = false
  }
}
const handleQuery = () => {
  loadRules()
}
const handleCreate = (id: number) => {
  ruleId.value = id
  formVisible.value = true
}
const handleStatusChange = async (item: Rule) => {
  try {
    item.statusLoading = true
    await changeRuleStatus(item.id, item.is_show)
  } finally {
    item.statusLoading = false
  }
}
const handleUpdate = (id: number) => {
  formVisible.value = true
  ruleId.value = id
}
const handleDelete = async (id: number) => {
  await deleteMenu(id)
  await loadRules()
}
const handleFormSuccess = () => {
  formVisible.value = false
  loadRules()
}

onMounted(() => {
  loadRules()
})
</script>

<style scoped>

</style>
