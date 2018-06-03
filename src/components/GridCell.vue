<template>
<div
    class="grid-cell"
    :class="{ populated: isPopulated, editable: isEditable }"
    @click.stop="$emit('click')"
>
</div>
</template>

<script>

export default {
    name: 'Grid-cell',
    props: {
        isEditable: {
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
    &.editable {
        cursor: pointer;
    }
}

</style>
