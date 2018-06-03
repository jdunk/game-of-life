<template>
<div>
    <div v-if="!cellData || !cellData.length">
        Grid Loading...
    </div>
    <div v-else class="life-grid">
        <div
            v-if="gridRow && gridRow.length" class="grid-row"
            v-for="(gridRow, rowIndex) in cellData"
            :key="rowIndex"
        >
            <GridCell
                v-for="(cell, colIndex) in gridRow"
                :key="`${rowIndex}-${colIndex}`"
                :is-populated="!!cell"
                :is-editable="isEditable"
                @click="toggleCell(rowIndex, colIndex)"
            />
        </div>
    </div>
</div>
</template>

<script>

import GridCell from './GridCell';

export default {
    name: 'LifeGrid',
    components: {
        GridCell,
    },
    props: {
        isEditable: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        cellData() {
            return this.$store.state.cellData;
        },
    },
    methods: {
        toggleCell(x, y) {
            if (!this.isEditable) {
                return;
            }

            this.$store.commit('toggleCell', { x, y });
            this.$store.commit('resetIterationNum');
        },
    },
    created() {
        this.$store.commit('updateGridDimensions');
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
