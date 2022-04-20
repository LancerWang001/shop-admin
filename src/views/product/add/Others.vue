<template>
  <el-form
    label-position="right"
    label-width="180px"
    :model="product"
  >
    <el-row>
      <el-form-item
        label="虚拟销量"
        prop="ficti"
      >
        <el-input-number
          v-model="product.ficti"
          :min="0"
          label="请输入虚拟销量"
        />
      </el-form-item>
      <el-form-item
        label="额外赠送积分"
        prop="give_integral"
      >
        <el-input-number
          v-model="product.give_integral"
          :min="0"
          label="请输入额外赠送积分"
        />
      </el-form-item>
      <el-form-item
        label="排序"
        prop="sort"
      >
        <el-input-number
          v-model="product.sort"
          :min="0"
          label="请输入排序"
        />
      </el-form-item>
    </el-row>
    <el-row>
      <el-form-item
        label="商品状态"
        prop="is_show"
      >
        <el-radio-group v-model="product.is_show">
          <el-radio :label="1">
            上架
          </el-radio>
          <el-radio :label="0">
            下架
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="热卖单品"
        prop="is_hot"
      >
        <el-radio-group v-model="product.is_hot">
          <el-radio :label="1">
            开启
          </el-radio>
          <el-radio :label="0">
            关闭
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="促销单品"
        prop="is_benefit"
      >
        <el-radio-group v-model="product.is_benefit">
          <el-radio :label="1">
            开启
          </el-radio>
          <el-radio :label="0">
            关闭
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-row>
    <el-row>
      <el-form-item
        label="精品推荐"
        prop="is_best"
      >
        <el-radio-group v-model="product.is_best">
          <el-radio :label="1">
            开启
          </el-radio>
          <el-radio :label="0">
            关闭
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="首发新品"
        prop="is_new"
      >
        <el-radio-group v-model="product.is_new">
          <el-radio :label="1">
            开启
          </el-radio>
          <el-radio :label="0">
            关闭
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="优品推荐"
        prop="is_good"
      >
        <el-radio-group v-model="product.is_good">
          <el-radio :label="1">
            开启
          </el-radio>
          <el-radio :label="0">
            关闭
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-row>
    <el-row>
      <el-form-item
        label="活动优先级"
        prop="activity"
      >
        <el-space>
          <app-draggable v-model="activities">
            <el-tag
              v-for="tag of activities"
              :key="tag.name"
              :type="tag.type"
              effect="dark"
            >
              {{ tag.name }}
            </el-tag>
          </app-draggable>
        </el-space>
      </el-form-item>
    </el-row>
    <el-form-item>
      <el-button type="primary">
        保存
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const activities = ref<{
  name: string
  type: 'info' | 'danger' | 'warning' | 'success'
}[]>([
  { type: 'info', name: '默认' },
  { type: 'danger', name: '秒杀' },
  { type: 'warning', name: '砍价' },
  { type: 'success', name: '拼团' }
])

const activity = computed(() => activities.value.map((item) => item.name))

const product = ref({
  ficti: 0,
  give_integral: 0,
  sort: 0,
  is_show: 0,
  is_hot: 0,
  is_benefit: 0,
  is_best: 0,
  is_good: 0,
  is_new: 0,
  activity
})
</script>

<style scoped>

</style>
