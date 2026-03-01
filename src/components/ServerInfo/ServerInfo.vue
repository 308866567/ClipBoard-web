<template>
  <div class="server-info-container">
    
    <div class="info-card">
      <el-card shadow="hover">
        <template #header>
          <div class="card-header">
            <span class="total-count">共 {{ services.length }} 个服务</span>
          </div>
        </template>
        
        <ServiceTable :services="services" />
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { serverServices } from '@/api/ServerInfoApi'
import ServiceTable from './ServiceTable.vue'

const services = serverServices
</script>

<style scoped>
.server-info-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 28px;
  margin-bottom: 8px;
  color: #303133;
}

.subtitle {
  font-size: 16px;
  color: #606266;
}

.info-card {
  margin-top: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-count {
  font-size: 14px;
  color: #909399;
}

.tips {
  margin-top: 20px;
}

.tips ul {
  margin: 8px 0 0 20px;
  line-height: 1.6;
}

.tips li {
  margin-bottom: 4px;
}
</style>