fixScale = function(doc) {

  var addEvent = 'addEventListener',
    type = 'gesturestart',
    qsa = 'querySelectorAll',
    scales = [1, 1],
    meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];

  function fix() {
    meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
    doc.removeEventListener(type, fix, true);
  }

  if((meta = meta[meta.length - 1]) && addEvent in doc) {
    fix();
    scales = [0.25, 1.6];
    doc[addEvent](type, fix, true);
  }

};

var sectionHeight = function() {
    var total = $(window).height(),
      $section = $('section').css('height', 'auto');

    if($section.outerHeight(true) < total) {
      var margin = $section.outerHeight(true) - $section.height();
      $section.height(total - margin - 20);
    } else {
      $section.css('height', 'auto');
    }
  };

$(window).resize(sectionHeight);

$(document).ready(function() {
  //--------------------navigate action-------------
  $('nav ul li a').click(function() {
    hideAllTabs();
    $('#div_' + $(this).attr('id')).show();
    $(this).addClass('activate');
  });

  var hideAllTabs = function() {
      for(var i = 1; i <= 5; i++) {
        $('#div_step' + i).hide();
        $('#div_step' + i).removeClass('activate');
      }

    };
  //--------------------define Model-----------------
  var Order = Backbone.Model.extend({
    defaults: {
      loadType: 'container',
      containerSize: 20,
      containerType: 'GP',
      truckSizeType: '1.5T'
    },
    validate: function(attrs) {
      if(false) { //attrs.end < attrs.start
        return "can't set value " + attrs.loadType;
      }
    }
  });

  var Cargo = Backbone.Model.extend({
    defaults: {
      name: '',
      length: 0,
      width: 0,
      height: 0,
      weight: 0,
      qty: 0,
      color: 'auto'
    },
    validate: function(attrs) {
      if(1) { //attrs.end < attrs.start
        return "can't end before it starts";
      }
    }
  });

  var Cargoes = Backbone.Collection.extend({
    model: Cargo
  });

  window.order = new Order();

  //
  order.on("error", function(model, error) {
    alert(model.get("loadType") + " " + error);
  });

  var init = function() {
      $('#div_step1').show();

      order.set({
        loadType: 'truck'
      });
      //alert(JSON.stringify(order));
    };

  init();

  var draw3d = function() {
      // set the scene size
      var WIDTH = 400,
        HEIGHT = 300;

      // set some camera attributes
      var VIEW_ANGLE = 15,
        ASPECT = WIDTH / HEIGHT,
        NEAR = 0.1,
        FAR = 10000;

      // get the DOM element to attach to
      // - assume we've got jQuery to hand
      var $container = $('#container');

      // create a WebGL renderer, camera
      // and a scene
      var renderer = new THREE.WebGLRenderer();
      var camera = new THREE.PerspectiveCamera(
      VIEW_ANGLE, ASPECT, NEAR, FAR);

      var scene = new THREE.Scene();

      // add the camera to the scene
      scene.add(camera);

      // the camera starts at 0,0,0
      // so pull it back
      camera.position.x = 10;
      camera.position.y = 50;
      camera.position.z = 30;

      // start the renderer
      renderer.setSize(WIDTH, HEIGHT);

      // attach the render-supplied DOM element
      $container.append(renderer.domElement);

      //定义球体
      var width = 150,
        height = 50,
        depth = 50;

      // 创建一个新的网格球体几何学 -
      // 在下一节我们将要涉及到sphereMaterial 
      var geometry = new THREE.CubeGeometry(5,5,5); 
      var cube = new THREE.Mesh(geometry, sphereMaterial);

      // 添加球体到场景
      scene.add(cube);

      // 创建一个球体的材质
      var sphereMaterial = new THREE.MeshLambertMaterial({
        color: 0xCC0000
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