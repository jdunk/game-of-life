<template>
<div class="grid-cell" :class="isPopulated ? 'populated' : ''">
</div>
</template>

<script>

export default {
    name: 'Grid-cell',
    props: {
        isClickable: {
            type: Boolean,
            default: false,
        },
        isPopulated: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
        };
    },
};

</script>

<style lang="scss" scoped>

.grid-cell {

    height: 10px;
    width: 10px;
    background-color: #d3d3d3;
    border-right: 1px solid #555;

    &.populated {
        background-color: darkcyan;
    }
}

</style>
