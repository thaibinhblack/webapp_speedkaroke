<template>
    <div>
        
    </div>
</template>

<script>
export default {
    mounted()
    {
        if(!this.$session.has('token'))
        {
            this.$f7router.navigate('/login/')
        }
    }
}
</script>