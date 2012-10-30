//unit test file  version1
//ray liu   20121026

var buildModel = function(){
    var order = new LH.Order();

    var cargo1 = new LH.Cargo();
    cargo1.set({cargoName: 'cargo1', length:36, width:28, height:12, weight:3, qty:200});

    var cargo2 = new LH.Cargo();
    cargo2.set({cargoName: 'cargo2', length:50, width:50, height:50, weight:3, qty:200, color: 'red'});

    var cargoes = new Backbone.Collection();
    cargoes.add(cargo1);
    cargoes.add(cargo2);

    //order.set({cargoes: cargoes});
    order.set({orderNo: '100000001', loadType: 'container', containerTypeSize:'GP20', containerType:'GP', cargoes: cargoes});
    return order;
};

var test_order;

module( "build model" );
test( "a build model test", function() {
    test_order = buildModel();
    console.log(test_order.toJSON());
    ok(test_order.get('cargoes'), "build model OK." );
});

module( "calc result" );
test( "FCL calculate result", function() {
    test_order = buildModel();
    console.log(test_order.getAlongLengthAmount());
    ok(test_order.getAlongLengthAmount()>0, "顺装 ="+ test_order.getAlongLengthAmount());
    ok(test_order.getAlongWidthAmount()>0, "侧装 ="+ test_order.getAlongWidthAmount());
    ok(test_order.getAlongHeightAmount()>0, "竖直装 ="+ test_order.getAlongHeightAmount());
});

test( "LCL calculate result", function() {
    test_order = buildModel();
    console.log(test_order.getAlongLengthAmount());
    ok(test_order.getAlongLengthAmount()>0, "顺装 ="+ test_order.getAlongLengthAmount());
    ok(test_order.getAlongWidthAmount()>0, "侧装 ="+ test_order.getAlongWidthAmount());
    ok(test_order.getAlongHeightAmount()>0, "竖直装 ="+ test_order.getAlongHeightAmount());
});