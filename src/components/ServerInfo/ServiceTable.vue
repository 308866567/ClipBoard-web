<template>
  <div class="service-table">
    <el-table :data="services" style="width: 100%" stripe border>
      <el-table-column prop="port" label="端口号" width="120" align="center">
        <template #default="scope">
          <el-link 
            type="primary" 
            :href="'http://' + scope.row.url" 
            target="_blank"
            :underline="false"
          >
            {{ scope.row.port }}
          </el-link>
        </template>
      </el-table-column>
      
      <el-table-column prop="description" label="服务描述" min-width="200">
        <template #default="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      
      <el-table-column prop="url" label="访问地址" min-width="180">
        <template #default="scope">
       <span>
        {{ scope.row.url }}
       </span>
        </template>
      </el-table-column>
      
      <el-table-column label="操作" width="180" align="center">
        <template #default="scope">
          <div style="display: flex; gap: 8px; justify-content: center;">
            <el-link 
              type="primary" 
              :href="'http://' + scope.row.url" 
              target="_blank"
              :underline="false"
            >
              访问
            </el-link>
            <el-button
              :icon="DocumentCopy"
              size="small"
              @click="copyToClipboard(scope.row.url)"
            >
              复制
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { DocumentCopy } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { ServerService } from '@/api/ServerInfoApi'

// 组件属性
interface Props {
  services: ServerService[]
}

const props = defineProps<Props>()

/**
 * 复制内容到剪贴板
 * @param content 要复制的内容
 */
const copyToClipboard = (content: string) => {
  navigator.clipboard.writeText(content).then(() => {
    ElMessage.success('🎉 地址已复制到剪贴板!')
  }).catch(() => {
    ElMessage.error('复制地址失败，请检查浏览器权限。')
  })
}
</script>

<style scoped>
.service-table {
  margin: 20px 0;
}

.el-link {
  font-weight: 500;
}

.el-link:hover {
  text-decoration: underline !important;
}
</style>