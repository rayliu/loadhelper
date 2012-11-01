/**
 * @author ray liu   http://rayliu.github.com/
 * since 2012
 */

var LH = LH || { REVISION: '1' };

(function(){
    // Container CONSTANTS
    LH.GP20 = {
        length: 569,
        width: 213,
        height: 218,
        maxWeight: 17500,
        maxVolume: 26000
    };

    LH.GP40 = {
        length: 1180,
        width: 213,
        height: 218,
        maxWeight: 22000,
        maxVolume: 54000
    };

    LH.HQ40 = {
        length: 1180,
        width: 213,
        height: 272,
        maxWeight: 22000,
        maxVolume: 68000
    };

    LH.HQ45 = {
        length: 1358,
        width: 234,
        height: 271,
        maxWeight: 29000,
        maxVolume: 86000
    };

    LH.OT20 = { //开顶柜 Open Top Container
        length: 589,
        width: 232,
        height: 231,
        maxWeight: 20000,
        maxVolume: 31500
    };

    LH.OT40 = {
        length: 1201,
        width: 233,
        height: 215,
        maxWeight: 30400,
        maxVolume: 65000
    };

    LH.PF20 = {//Platform Container
        length: 585,
        width: 223,
        height: 215,
        maxWeight: 23000,
        maxVolume: 28000
    };

    LH.PF40 = {//Platform Container
        length: 1205,
        width: 212,
        height: 196,
        maxWeight: 36000,
        maxVolume: 50000
    };

//--------------------define Model-----------------
    LH.Order = Backbone.Model.extend({
        defaults:{
            orderNo: '',
            loadType: 'container',
            containerTypeSize: 'GP20',
            containerType: 'GP',
            truckSizeType: '1.5T',
            totalWeight: 0,
            totalVolume: 0,
            cargoes: Backbone.Collection.extend({
                model: LH.Cargo
            })
        },
        validate:function (attrs) {
            var totalWt = 0;
            _.each(attrs.cargoes.models, function(cargo){
                totalWt += cargo.get('weight')*cargo.get('qty');
            });
            attrs.totalWeight = totalWt;
            this.attributes.totalWeight = totalWt;

            var conts = getContainerConts(attrs);
            if(conts.maxWeight<attrs.totalWeight){
                alert('超重了');
            }
            if(conts.totalVolume<attrs.totalVolume){
                alert('超体积了');
            }

            console.log('order.totalWeight='+attrs.totalWeight);
            //check over weight
            console.log(JSON.stringify(attrs));
            //check over volume

//        if (false) { //attrs.end < attrs.start
//            return "can't set value " + attrs.loadType;
//        }
            //return true;
        },
        getAlongLengthAmount: function(){
            var conts = getContainerConts(this.attributes);
            var boxAmount=0, lAmount=0, wAmount=0, hAmount=0;
            var cargo = this.attributes.cargoes.models[0];
            lAmount = Math.floor(conts.length/cargo.get('length'));
            wAmount = Math.floor(conts.width/cargo.get('width'));
            hAmount = Math.floor(conts.height/cargo.get('height'));
            boxAmount = lAmount*wAmount*hAmount;
            return boxAmount;
        },
        getAlongWidthAmount: function(){
            var conts = getContainerConts(this.attributes);
            var boxAmount=0, lAmount=0, wAmount=0, hAmount=0;
            var cargo = this.attributes.cargoes.models[0];
            lAmount = Math.floor(conts.length/cargo.get('width'));
            wAmount = Math.floor(conts.width/cargo.get('length'));
            hAmount = Math.floor(conts.height/cargo.get('height'));
            boxAmount = lAmount*wAmount*hAmount;
            return boxAmount;
        },
        getAlongHeightAmount: function(){
            var conts = getContainerConts(this.attributes);
            var boxAmount=0, lAmount=0, wAmount=0, hAmount=0;
            var cargo = this.attributes.cargoes.models[0];
            lAmount = Math.floor(conts.length/cargo.get('height'));
            wAmount = Math.floor(conts.width/cargo.get('width'));
            hAmount = Math.floor(conts.height/cargo.get('length'));
            boxAmount = lAmount*wAmount*hAmount;
            return boxAmount;
        }
    });

    function getContainerConts(order){
        if(order.loadType=='container'){
            switch (order.containerTypeSize){
                case 'GP20':
                    return LH.GP20;
                case 'GP40':
                    return LH.GP40;    
                default:
                    return null;
            }
        }
        return null;
    }

    LH.Cargo = Backbone.Model.extend({
        defaults:{
            cargoName:'',
            length:0,
            width:0,
            height:0,
            weight:0,
            qty:0,
            color:'auto'
        }
    });

//    LH.Cargoes = Backbone.Collection.extend({
//        model: LH.Cargo
//    });

// -------------------define model End-----------------------------
})();

