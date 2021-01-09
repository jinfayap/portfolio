<template>
    <div class = 'singleCert'>
        <div class = 'cert-header'>
            <div class="cert-title">
                <router-link :to = "{name : 'CertificateInfo', params: { id: certificate.id }}" class = 'blackbg-visit'>
                    {{ certificate.title }}
                </router-link>
                
                <a :href="certificate.webUrl" class = 'cert-web'>
                    <span class = 'material-icons'>open_in_browser</span>
                </a>
            </div>
            <img :src="certificate.imageUrl" alt="">
        </div>
        <div class = 'cert-provider'>
            - {{ certificate.provider }}
        </div>
    </div>
</template>

<script>
export default {
    props: [ 'certificate' ],
    setup() {

    }
}
</script>

<style scoped>
.singleCert {
    width: 500px;
    min-height: 370px;
    max-height: 400px;
    border: 1px dashed white;
    border-radius: 10px;
    margin: 10px;
    text-align: center;
}
.cert-web span {
    color: white;
}
.cert-web span.material-icons {
    font-size: 22px;
}
.cert-header img {
    max-height: 400px;
    max-width: 350px;
    object-fit: cover;
}
.cert-title {
    font-weight: 600;
    letter-spacing: 2px;
    font-size: 16px;
    margin: 1em 0;
    color: white;
}
.cert-provider {
    font-size: 10px;
    text-align: end;
    padding-right: 7em;
    margin-top: 10px;
    font-weight: 500;
}
.blackbg-visit:visited {
    color: white;
}
</style>