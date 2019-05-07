import Vue from 'vue';

export const filters = () => {
// 金额保留两位小数
  Vue.filter('priceFormat', function (val) {
    if(val == null || val == undefined){
      return "0.00";
    }
    val = val.toString().replace(/\$|\,/g,'');
    if(isNaN(val)) {
      val = "0";
    }
    let sign = (val == (val = Math.abs(val)));
    val = Math.floor(val*100+0.50000000001);
    let cents = val%100;
    val = Math.floor(val/100).toString();
    if(cents<10) {
      cents = "0" + cents
    }
    for (var i = 0; i < Math.floor((val.length-(1+i))/3); i++) {
      val = val.substring(0,val.length-(4*i+3))+',' + val.substring(val.length-(4*i+3));
    }
    return (((sign)?'':'-') + val + '.' + cents);
  });

  Vue.filter('weightFormat', function (val) {
    if (val == null || val == undefined || val == 0) {
      return "0.000";
    }
    val = val.toString().replace(/\$|\,/g, '');
    if (isNaN(val)) {
      val = "0";
    }
    let sign = (val == (val = Math.abs(val)));
    val = Math.floor(val * 1000 + 0.50000000001);
    let cents = val % 1000;
    val = Math.floor(val / 1000).toString();
    if (cents < 100 && cents >= 10) {
      cents = "0" + cents
    } else if (cents < 10) {
      cents = "00" + cents
    }
    for (var i = 0; i < Math.floor((val.length - (1 + i)) / 3); i++) {
      val = val.substring(0, val.length - (4 * i + 3)) + ',' + val.substring(val.length - (4 * i + 3));
    }
    return (((sign) ? '' : '-') + val + '.' + cents);
  });

  Vue.filter('cutStrFormat', function (val) {
    if(value&& value.length > 2) {
      value= value.substring(value.length,2);
    }
    return value;
  });
};
