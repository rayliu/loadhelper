var buildModel = function(){
    var order = new LH.Order();
    order.set({orderNo: '100000001', loadType: 'container', containerSize:20, containerType:'GP'});

    var cargo1 = new LH.Cargo();
    cargo1.set({cargoName: 'cargo1'});

    var cargo2 = new LH.Cargo();
    cargo2.set({cargoName: 'cargo2', color: 'red'});

    var cargoes = new Backbone.Collection();
    cargoes.add(cargo1);
    cargoes.add(cargo2);

    order.set({cargoes: cargoes});
    return order;
};
var orderModel;
module( "group build model" );
test( "a build model test", function() {
    orderModel = buildModel();
    console.log(JSON.stringify(orderModel));
    ok( orderModel.get('cargoes'), "build model OK." );
});

module( "group calc result" );
test( "calculate result", function() {
    LH.Math
    ok(orderModel.get('cargoes'), "this calculate result is fine" );
});
