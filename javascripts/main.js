function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return unescape(r[2]); return null;
}

fixScale = function (doc) {

    var addEvent = 'addEventListener',
        type = 'gesturestart',
        qsa = 'querySelectorAll',
        scales = [1, 1],
        meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];

    function fix() {
        meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
        doc.removeEventListener(type, fix, true);
    }

    if ((meta = meta[meta.length - 1]) && addEvent in doc) {
        fix();
        scales = [0.25, 1.6];
        doc[addEvent](type, fix, true);
    }

};

var sectionHeight = function () {
    var total = $(window).height(),
        $section = $('section').css('height', 'auto');

    if ($section.outerHeight(true) < total) {
        var margin = $section.outerHeight(true) - $section.height();
        $section.height(total - margin - 20);
    } else {
        $section.css('height', 'auto');
    }

};

$(window).resize(sectionHeight);



$(document).ready(function () {

    //--------------------navigate action-------------
    $('nav ul li a').click(function () {
        hideAllTabs();
        showStepDiv('div_' + $(this).attr('id'));
        $(this).addClass('activate');
    });

    var hideAllTabs = function () {
        for (var i = 1; i <= 5; i++) {
            $('#div_step' + i).hide();
            $('#div_step' + i).removeClass('activate');
        }
    };

    var showStepDiv = function (divId) {
        $('#' + divId).show();
    };

    $('#addCargoBtn').click(function () {
        var cargoRowTpl = $('#cargoRowTpl').html();
        var data={cargoName:'demo', length:100, width:200, height:30, weight:30, qty:20, color:'auto'};

        var html = Mustache.to_html( cargoRowTpl, data );
        $('#cargoList').append('<tr>'+html+'</tr>');

        //bind the new event for el
        $('#cargoList tr td a.delete').click(function(){
            $(this).parent().parent().remove();
        });
    });

    $('#step1nextBtn').click(function () {
        hideAllTabs();
        showStepDiv('div_step2');
    });
    $('#step2preBtn').click(function () {
        hideAllTabs();
        showStepDiv('div_step1');
    });
    $('#step2nextBtn').click(function () {
        hideAllTabs();
        showStepDiv('div_step3');
    });
    $('#step3preBtn').click(function () {
        hideAllTabs();
        showStepDiv('div_step2');
    });
    $('#step3nextBtn').click(function () {
        hideAllTabs();
        showStepDiv('div_step4');
    });
    $('#step4preBtn').click(function () {
        hideAllTabs();
        showStepDiv('div_step3');
    });
    $('#step4nextBtn').click(function () {
        hideAllTabs();
        showStepDiv('div_step5');
    });
    $('#step5preBtn').click(function () {
        hideAllTabs();
        showStepDiv('div_step4');
    });

    $('#step2calcBtn').click(function () {
        order.set("containerTypeSize", $('#containerTypeSize').val());

        var length, width, height, weight;
        length = $('#cargoRow1>td:eq(0)>input').val();
        width = $('#cargoRow1>td:eq(1)>input ').val();
        height = $('#cargoRow1>td:eq(2)>input ').val();
        weight = $('#cargoRow1>td:eq(3)>input ').val();

        var cargo = new LH.Cargo({length:length, width:width, height:height, weight:weight});
        var cargoes = new Backbone.Collection();
        cargoes.add(cargo);
        order.set('cargoes', cargoes);

        var alongLengthAmount = order.getAlongLengthAmount();
        var alongWidthAmount = order.getAlongWidthAmount();
        var alongHeightAmount = order.getAlongHeightAmount();

        //alert('顺装：'+alongLengthAmount+', 侧装：'+alongWidthAmount+', 竖装：'+alongHeightAmount);
        $('#alongLengthAmount').text(alongLengthAmount);
        $('#alongWidthAmount').text(alongWidthAmount);
        $('#result').show();

    });


    var order = new LH.Order();

    //
    order.on("error", function (model, error) {
        alert(model.get("loadType") + " " + error);
    });

    var init = function () {
        $('#div_step1').show();

        

        // $('#orderJson').val(JSON.stringify(order));

        // var orderJson = GetQueryString("orderJson");
        // if(orderJson && orderJson.length>0){
        //     hideAllTabs();
        //     showStepDiv('div_step5');
        // }
    };

    init();

    var draw3d = function () {
        // set the scene size
        var WIDTH = 400,
            HEIGHT = 300;

        // set some camera attributes
        var VIEW_ANGLE = 45,
            ASPECT = WIDTH/HEIGHT,
            NEAR = 50,
            FAR = 1000;

        // get the DOM element to attach to
        // - assume we've got jQuery to hand
        var $container = $('#container');

        // create a WebGL renderer, camera
        // and a scene
        var renderer = new THREE.WebGLRenderer();
        var camera = new THREE.PerspectiveCamera(
            VIEW_ANGLE, ASPECT, NEAR, FAR);
        var camera2 = new THREE.PerspectiveCamera()

        var scene = new THREE.Scene();

        // add the camera to the scene
        scene.add(camera);

        // the camera starts at 0,0,0
        // so pull it back
        camera.position.x = 0;
        camera.position.y = 50;
        camera.position.z = 200;

        // start the renderer
        renderer.setSize(WIDTH, HEIGHT);

        // attach the render-supplied DOM element
        $container.append(renderer.domElement);

        // grid
        var plane = new THREE.Mesh(new THREE.PlaneGeometry(100, 100, 20, 20), new THREE.MeshBasicMaterial({ color:0x555555, wireframe:true }));
        plane.rotation.x = -Math.PI / 2;
        scene.add(plane);

        //定义立方体
        var width = 150,
            height = 50,
            depth = 50;

        // 创建一个新的网格立方体几何学 -
        // 在下一节我们将要涉及到sphereMaterial
        var geometry = new THREE.CubeGeometry(5, 5, 5);
        var cube = new THREE.Mesh(geometry, sphereMaterial);

        // 添加立方体到场景
        scene.add(cube);

        // 创建一个立方体的材质
        var sphereMaterial = new THREE.MeshLambertMaterial({
            color:0xCC0000
        });

        // 创建一个光的源点
        var pointLight = new THREE.PointLight(0xFFFFFF);

        // 设置光源点位置
        pointLight.position.x = 5;
        pointLight.position.y = 5;
        pointLight.position.z = 30;

        // 添加到场景
        scene.add(pointLight);

        // 绘画!
        renderer.render(scene, camera);
    };

    draw3d();
});