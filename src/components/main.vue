<template>
    <div id="ty" style="z-index:0;padding:0" class="container-fluid">
        <div id="carouselExampleCaptions" class="carousel slide carousel-fade" data-bs-ride="carousel">
        <ol class="carousel-indicators">
            <li data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"></li>
            <li data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"></li>
        </ol>
        <div class="carousel-inner ">
            <div class="carousel-item active justify-content-around align-items-center">
                <img src="./images/banner1.jpg" class="col-md-12" style="padding:0">
                <div class="carousel-caption d-none d-md-block" >
                    <h3 style="position:relative;top:-30vw; left:30vw;" >格別な味と香り、独特のコクが<br>
                    自慢のオリジナルコーヒーです</h3>
                    <h5 style="position:relative;top:-430px;left:380px;text-align:left;" data-aos="fade-down" >
                        珈琲館はあくまで“品質”にこだわり続け、<br>
                        良質のコーヒー豆だけを厳選し、<br>
                        しかも少量でしか生産していません。<br>
                        お客様に最高のコーヒーだけを<br>
                        お届けすることが珈琲館のモットーなのです。<br>
                        そこにはどんな妥協も許されません<br>
                    </h5>
                </div>
            </div>
                <div class="carousel-item ">
                    <img src="./images/banner2.jpg" class="col-md-12 " style="padding:0">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>Second slide label</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                </div>
            </div>
        </div>
        <h2 class="slogan" data-aos="zoom-in">-コーヒーは飲むことができる一種の魔法である-</h2>
        <div class="row col-md-12 justify-content-center" style="margin:10vw auto 5vw">
            <router-link to="/admin/main"><img src="./images/BLO-BIG.jpg" class="col-md-3 col-sm-3 mr-4 image1"style="padding:0px" data-aos="fade-left"  data-aos-duration="3000"></router-link>
            <router-link to="/admin/main"><img src="./images/med-big.jpg" class="col-md-3 col-sm-3 image2" style="padding:0px" data-aos="fade-down"  data-aos-duration="3000"></router-link>
            <router-link to="/admin/main"><img src="./images/dark-big.jpg" class="col-md-3 col-sm-3 ml-4 image3" style="padding:0px" data-aos="fade-right"  data-aos-duration="3000"></router-link>
        </div>   
        </div>
    </div>
</template>

<style scoped>
.row>* {
    display:contents;
    z-index:0;
}
#ty{
    
    height:100%;
}
.slogan{
    position:absolute;
    margin:5vw 25vw;
    z-index:1;
    text-shadow: 2px 3px 1px black, 0px 0px 2px black; 
    color: white;
}
.image1:hover  {
  opacity: 0.7;

}
.image2:hover{
  opacity: 0.7;
}
.image3:hover{
  opacity: 0.7;
}
</style>
