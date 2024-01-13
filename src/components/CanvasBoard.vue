<template>
    <div>
        <div class="tool-bar">
            <button v-for="tool in tools" :key="tool.name" @click="tool.useTool">
                {{ tool.displayName }}
            </button>
        </div>
        <canvas id="canvas" width="800" height="600" />
    </div>
</template>


<script setup lang="ts">
import initApp from '../domain';
import { ref, onMounted } from 'vue';
const tools: any = ref([]);
onMounted(() => {
    const app = initApp('canvas');
    const toolManager = app.get('toolManager');
    tools.value = toolManager.getAvailableTools();
});
</script>

<style scoped>
#canvas {
    border: 1px solid #000;
}
</style>