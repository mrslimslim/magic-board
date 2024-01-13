<template>
    <div>
        <div class="tool-bar">
            <button v-for="tool in tools" :key="tool.name" @click="tool.useTool">
                {{tool.displayName}}
            </button>
        </div>
        <div id="canvas">
        </div>
    </div>
    
</template>


<script setup lang="ts">
import initApp from '../domain';
const app = initApp('canvas');
console.log('123');
const toolManager =  app.get('toolManager');
const tools = toolManager.getAvailableTools();
// [{displayName: 'Pen', name: 'pen', useTool}, {displayName: 'Eraser', name: 'eraser'}]
console.log(tools);


</script>

<style scoped>
#canvas {
    width: 1000px;
    height: 800px;
    background-color: #fff;
}
</style>