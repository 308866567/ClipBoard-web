

<template>
  <el-card shadow="hover" class="clip-card">
    <div class="card-header">
      <span class="card-field">{{ props.field }}</span>

      <div class="card-actions">
        <el-button
            :icon="DocumentCopy"
            link
            @click="copyToClipboard(props.field, '键')"
        >
          复制键
        </el-button>

        <el-button
            :icon="DocumentCopy"
            type="success"
            @click="copyToClipboard(inputValue, '值')"
        >
          复制值
        </el-button>

        <el-divider direction="vertical" />

        <el-button
            type="primary"
            :icon="Check"
            :disabled="!isValueChanged"
            @click="handleSave"
        >
          保存修改
        </el-button>

        <el-button
            type="danger"
            :icon="Delete"
            @click="handleDelete"
        >
          删除
        </el-button>
      </div>
    </div>

    <div class="card-body">
      <el-input
          v-model="inputValue"
          :rows="3"
          type="textarea"
          placeholder="请输入内容值"
      />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { DocumentCopy, Check, Delete } from '@element-plus/icons-vue'
// 1. 定义事件传出的数据结构 (DTO)
import type {ClipboardUpdateDto} from "@/api/ClipboardApi.ts";




// 2. 定义 Props
interface Props {
  field: string;
  v: string;
}
const props = defineProps<Props>()

// 3. 定义 Events
const emit = defineEmits<{
  // 推荐使用 TS 声明事件，提供类型检查
  (e: 'saveUpdate', data: ClipboardUpdateDto): void
  (e: 'deleteItem', field: string): void
}>()

// 4. 内部状态管理
// 内部维护一个可修改的值的副本
const inputValue = ref(props.v)

// 监听 props.value 变化，同步更新 inputValue（例如父组件重置数据）
watch(() => props.v, (newValue) => {
  inputValue.value = newValue
})

// 计算属性：判断值是否发生变化，用于控制保存按钮的禁用状态
const isValueChanged = computed(() => inputValue.value !== props.v)

// 5. 事件处理方法

/**
 * 复制内容到剪贴板
 * @param content 要复制的内容
 * @param type 内容类型（键或值）
 */
const copyToClipboard = (content: string, type: '键' | '值') => {
  navigator.clipboard.writeText(content).then(() => {
    ElMessage.success(`🎉 ${type}已复制到剪贴板!`)
  }).catch(() => {
    ElMessage.error(`复制${type}失败，请检查浏览器权限。`)
  })
}

// 处理保存修改事件
const handleSave = () => {
  // 只有值改变时才触发保存事件
  if (isValueChanged.value) {
    const ClipboardUpdateDto: ClipboardUpdateDto = {
      field: props.field,
      value: inputValue.value,
    }
    // 触发 save-update 事件，并传出 DTO
    emit('saveUpdate', ClipboardUpdateDto)
  }
}

// 处理删除事件
const handleDelete = () => {
  // 触发 delete-item 事件，传出当前 field
  if (props.field) {
    emit('deleteItem', props.field)
  }
}


/*
用vue3和element-plus写一个名为clipCard的子组件,父组件将会传入一个类型为[field: string]: string;的值,如"1":"内容1";
存在事件保存修改,删除,事件传出内容为
interface ClipboardUpdateDto {
field?: string;
value: string;
}
卡片组件 (ClipboardCard)结构：
上部：键 +按钮组（按钮包括：复制键、复制值、保存修改、删除）
下部：值显示区一个输入框显示值
* */
</script>

<style scoped>
.clip-card {
  margin-bottom: 20px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--el-border-color-lighter);
}
.card-field {
  font-size: 1.1em;
  font-weight: bold;
  color: var(--el-color-primary);
  flex-shrink: 0;
  margin-right: 20px;
}
.card-actions {
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>