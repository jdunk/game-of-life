<template>
<div>
    <div v-if="!cellData || !cellData.length">
        Grid Loading...
    </div>
    <div v-else class="life-grid">
        <div
            v-if="gridRow.length" class="grid-row"
            v-for="(gridRow, rowIndex) in cellData"
            :key="rowIndex"
        >
            <GridCell
                v-for="(cell, colIndex) in gridRow"
                :key="`${rowIndex}-${colIndex}`"
                :is-populated="!!cell"
            />
        </div>
    </div>
</div>
</template>

<script>

import GridCell from './GridCell';

export default {
    name: 'LifeGrid',
    props: {
        cellData: {
            type: Array,
            default: [],
        },
    },
    data() {
        return {};
    },
    components: {
        GridCell,
    },
    created() {
        console.log('lifegrid created');
    },
};

</script>

<style lang="scss" scoped>

.life-grid {
    border-top: 1px solid #555;
    border-left: 1px solid #555;
}

.grid-row {
    border-bottom: 1px solid #555;
    display: flex;
}

</style>
