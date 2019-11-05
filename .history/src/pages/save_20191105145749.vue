<template>
<f7-page>
    <f7-navbar  back-link="Back">Các quán karaoke yêu thích của bạn</f7-navbar>
</f7-page>
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