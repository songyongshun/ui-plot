function draw_axis() {
  // 箭头:
  var arrow_angle=30;
  var arrow_length=10;
  //坐标轴
  context.font = "bold 14px Arial";
  context.beginPath();
  context.moveTo(x0, y0+shift_y1);
  context.lineTo(x0, y_max - y0);//y轴，
  context.moveTo(x0-shift_x1, y0);
  context.lineTo(x0 + x_total, y0); // x轴,偏上，也就是小了。
  context.fillText("0", x0, y0 + shift_y);
  //x arrow:
  context.moveTo(x0+x_total, y0);
  context.lineTo(x0 + x_total-arrow_length*Math.cos(arrow_angle/180*Math.PI), y0-arrow_length*Math.sin(arrow_angle/180*Math.PI)); 
  context.moveTo(x0+x_total, y0);
  context.lineTo(x0 + x_total-arrow_length*Math.cos(arrow_angle/180*Math.PI), y0+arrow_length*Math.sin(arrow_angle/180*Math.PI)); 
  //y arrow:
  context.moveTo(x0, y_max-y0); // x轴,偏上，也就是小了。
  context.lineTo(x0-arrow_length*Math.sin(arrow_angle/180*Math.PI), y_max - y0+arrow_length*Math.cos(arrow_angle/180*Math.PI));//y轴，
  context.moveTo(x0, y_max-y0); // x轴,偏上，也就是小了。
  context.lineTo(x0+arrow_length*Math.sin(arrow_angle/180*Math.PI), y_max - y0+arrow_length*Math.cos(arrow_angle/180*Math.PI));//y轴，

  context.stroke();
  //center
  // context.fillText("U (V)", x0 + x_total * 0.5, y0 + shift_y1);
  // context.fillText("I (mA)", x0 - shift_x1, y0 - y_total / 2);
  // // terminal
  context.fillText("U (V)", x0 + x_total, y0);
  context.fillText("I (mA)", x0, y0 - y_total);

}

function $(id) {
  return document.getElementById(id);
}

function Add() {
  var newInput = $("mod").cloneNode(true);
  newInput.style.display = "block";
  $("function").appendChild(newInput);
}

function Delete(node) {
  node.parentNode.removeChild(node);
}

function dot_star(px,py) {
      context.beginPath();
      context.moveTo(x0 + (parseInt(px * 10 ** floatn) / 10 ** floatn * x_ratio - 0.5 * rec_size), y0 - (parseInt(py * 10 ** floatn) / 10 ** floatn * y_ratio + 0.5 * rec_size));
      context.lineTo(x0 + (parseInt(px * 10 ** floatn) / 10 ** floatn * x_ratio + 0.5 * rec_size), y0 - (parseInt(py * 10 ** floatn) / 10 ** floatn * y_ratio - 0.5 * rec_size));

      context.moveTo(x0 + (parseInt(px * 10 ** floatn) / 10 ** floatn * x_ratio + 0.5 * rec_size), y0 - (parseInt(py * 10 ** floatn) / 10 ** floatn * y_ratio + 0.5 * rec_size));
      context.lineTo(x0 + (parseInt(px * 10 ** floatn) / 10 ** floatn * x_ratio - 0.5 * rec_size), y0 - (parseInt(py * 10 ** floatn) / 10 ** floatn * y_ratio - 0.5 * rec_size));
      context.stroke();
    }


    function dot_rec(px,py){
      context.fillRect(x0 + (parseInt(px * 10 ** floatn) / 10 ** floatn * x_ratio - 0.5 * rec_size), y0 - (parseInt(py * 10 ** floatn) / 10 ** floatn * y_ratio + 0.5 * rec_size), rec_size, rec_size);
    }

function run() {
  // var group_x = document.getElementsByName("0");
  var group_x = document.getElementsByName("var_x");
  var group_y = document.getElementsByName("var_y");


  var x_range = parseInt(xmax.value * 10 ** floatn) / 10 ** floatn - parseInt(xmin.value ** 10 ** floatn) / 10 ** floatn;
  var y_range = parseInt(ymax.value * 10 ** floatn) / 10 ** floatn - parseInt(ymin.value ** 10 ** floatn) / 10 ** floatn;
  var x_ntick = 5;
  var y_ntick = 5;
  var x_step = 1;
  var y_step = 1;
  var x_dec = 1000; //小数点位数.
  var y_dec = 100;
  var x_bar = 5;
  var y_bar = 5;

  // 如果x_range 10级别，整数, 1级别，1位小数，0.1级别，2位小数.
  // if x_range>10 
  //   else x_range>1 
// 10/5=2, 2000/=1000,2.000
  x_step = parseInt((x_range / x_ntick + 0.5 / x_dec) * x_dec) / x_dec;
  //0.1/3+0.05=

  y_step = parseInt((y_range / y_ntick + 0.5 / y_dec) * y_dec) / y_dec;

  //x_range=100  画到 x_total=10上，那么，1要分成10格.
  // xp,yp = xp*0.1, yp*0.1
  // 
  x_ratio = x_total / x_range;
  y_ratio = y_total / y_range;
  // x axis, label
  context.textAlign = "center";
  for (i = 1; i <= x_ntick; i++) {
    var x_tick= parseInt((x_step + 0.1 / x_dec) * i * x_dec) / x_dec;
    context.fillText(x_tick.toFixed(3), x0 - shift_x + x_step * x_ratio * i, y0 + shift_y);
  }

  // y axis, 偏下，也就是太大了。搞小一点.
  context.textAlign = "right";
  for (i = 1; i <= y_ntick; i++) {
    var y_tick=parseInt((y_step + 0.1 / y_dec) * i * y_dec) / y_dec;
    context.fillText(y_tick.toFixed(2), x0, y0 - y_step * y_ratio * i);
  }

  // x_ticks_bar and y_ticks_bar.
  context.beginPath();
  // x axis
  for (i = 1; i <= x_ntick; i++) {
    context.moveTo(x0 + x_step * x_ratio * i, y0);
    context.lineTo(x0 + x_step * x_ratio * i, y0 - y_bar);
  }

  // y axis
  for (i = 1; i <= y_ntick; i++) {
    context.moveTo(x0, y0 - y_step * y_ratio * i);
    context.lineTo(x0 + x_bar, y0 - y_step * y_ratio * i);
  }

  context.stroke();

  //画点,第一个是隐藏的，跳过.

  for (i = 1; i < group_x.length; i++) {
    dot_star(group_x[i].value,group_y[i].value);
}
  //画线
  context.beginPath();
  for (i = 2; i < group_x.length; i++) {
    context.moveTo(x0 + (parseInt(group_x[i - 1].value * 10 ** floatn) / 10 ** floatn * x_ratio), y0 - (parseInt(group_y[i - 1].value * 10 ** floatn) / 10 ** floatn * y_ratio));

    context.lineTo(x0 + (parseInt(group_x[i].value * 10 ** floatn) / 10 ** floatn * x_ratio), y0 - (parseInt(group_y[i].value * 10 ** floatn) / 10 ** floatn * y_ratio));
  }
  context.stroke();
}

function run_line() {
  // var group_x = document.getElementsByName("0");
  var group_x = document.getElementsByName("var_x");
  var group_y = document.getElementsByName("var_y");


  var x_range = parseInt(xmax.value * 10 ** floatn) / 10 ** floatn - parseInt(xmin.value ** 10 ** floatn) / 10 ** floatn;
  var y_range = parseInt(ymax.value * 10 ** floatn) / 10 ** floatn - parseInt(ymin.value ** 10 ** floatn) / 10 ** floatn;
  var x_ntick = 5;
  var y_ntick = 5;
  var x_step = 1;
  var y_step = 1;
  var x_dec = 1000; //小数点位数.
  var y_dec = 100;
  var x_bar = 5;
  var y_bar = 5;

  // 如果x_range 10级别，整数, 1级别，1位小数，0.1级别，2位小数.
  // if x_range>10 
  //   else x_range>1 
  // 10/5=2, 2000/=1000,2.000
  x_step = parseInt((x_range / x_ntick + 0.5 / x_dec) * x_dec) / x_dec;
  //0.1/3+0.05=

  y_step = parseInt((y_range / y_ntick + 0.5 / y_dec) * y_dec) / y_dec;

  //x_range=100  画到 x_total=10上，那么，1要分成10格.
  // xp,yp = xp*0.1, yp*0.1
  // 
  x_ratio = x_total / x_range;
  y_ratio = y_total / y_range;
  // x axis, label
  context.textAlign = "center";
  for (i = 1; i <= x_ntick; i++) {
    var x_tick = parseInt((x_step + 0.1 / x_dec) * i * x_dec) / x_dec;
    context.fillText(x_tick.toFixed(3), x0 - shift_x + x_step * x_ratio * i, y0 + shift_y);
  }

  // y axis, 偏下，也就是太大了。搞小一点.
  context.textAlign = "right";
  for (i = 1; i <= y_ntick; i++) {
    var y_tick = parseInt((y_step + 0.1 / y_dec) * i * y_dec) / y_dec;
    context.fillText(y_tick.toFixed(2), x0, y0 - y_step * y_ratio * i);
  }

  // x_ticks_bar and y_ticks_bar.
  context.beginPath();
  // x axis
  for (i = 1; i <= x_ntick; i++) {
    context.moveTo(x0 + x_step * x_ratio * i, y0);
    context.lineTo(x0 + x_step * x_ratio * i, y0 - y_bar);
  }

  // y axis
  for (i = 1; i <= y_ntick; i++) {
    context.moveTo(x0, y0 - y_step * y_ratio * i);
    context.lineTo(x0 + x_bar, y0 - y_step * y_ratio * i);
  }

  context.stroke();

  //画点,第一个是隐藏的，跳过.

// 画星号
  for (i = 1; i < group_x.length; i++) {
    dot_star(group_x[i].value,group_y[i].value);
}
  //画线
  context.beginPath();

  var x_sum=0;
    var y_sum=0;
    var xy_sum=0;
    var x2_sum=0;

    for (i = 1; i < group_x.length; i++) {
    var x1 = parseFloat(group_x[i].value);
    var y1 = parseFloat(group_y[i].value);


    x_sum=x_sum+x1;
    y_sum=y_sum+y1;
    xy_sum=xy_sum+x1*y1;
    x2_sum=x2_sum+x1**2;
  }
  
  var a1=((group_x.length-1)*xy_sum-x_sum*y_sum)/((group_x.length-1)*x2_sum-x_sum**2);
  var a0=(y_sum-a1*x_sum)/(group_x.length-1);

  
  for (i = 2; i < group_x.length; i++) {
    var x1 = parseFloat(group_x[i-1].value);
    var y1 = a1*x1+a0;
    var x2 = parseFloat(group_x[i].value);
    var y2 = a1*x2+a0;

    context.moveTo(x0 + (parseInt(x1 * 10 ** floatn) / 10 ** floatn * x_ratio), y0 - (parseInt(y1 * 10 ** floatn) / 10 ** floatn * y_ratio));
    context.lineTo(x0 + (parseInt(x2 * 10 ** floatn) / 10 ** floatn * x_ratio), y0 - (parseInt(y2 * 10 ** floatn) / 10 ** floatn * y_ratio));
  }

  context.stroke();

}

function run_2nd() {
  var group_x = document.getElementsByName("var_x");
  var group_y = document.getElementsByName("var_y");


  var x_range = parseInt(xmax.value * 10 ** floatn) / 10 ** floatn - parseInt(xmin.value ** 10 ** floatn) / 10 ** floatn;
  var y_range = parseInt(ymax.value * 10 ** floatn) / 10 ** floatn - parseInt(ymin.value ** 10 ** floatn) / 10 ** floatn;
  var x_ntick = 5;
  var y_ntick = 5;
  var x_step = 1;
  var y_step = 1;
  var x_dec = 1000; //小数点位数.
  var y_dec = 100;
  var x_bar = 5;
  var y_bar = 5;

  // 如果x_range 10级别，整数, 1级别，1位小数，0.1级别，2位小数.
  // if x_range>10 
  //   else x_range>1 
  // 10/5=2, 2000/=1000,2.000
  x_step = parseInt((x_range / x_ntick + 0.5 / x_dec) * x_dec) / x_dec;
  //0.1/3+0.05=

  y_step = parseInt((y_range / y_ntick + 0.5 / y_dec) * y_dec) / y_dec;

  //x_range=100  画到 x_total=10上，那么，1要分成10格.
  // xp,yp = xp*0.1, yp*0.1
  // 
  x_ratio = x_total / x_range;
  y_ratio = y_total / y_range;
  // x ax_sums, label
  context.textAlign = "center";
  for (i = 1; i <= x_ntick; i++) {
    var x_tick = parseInt((x_step + 0.1 / x_dec) * i * x_dec) / x_dec;
    context.fillText(x_tick.toFixed(3), x0 - shift_x + x_step * x_ratio * i, y0 + shift_y);
  }

  // y ax_sums, 偏下，也就是太大了。搞小一点.
  context.textAlign = "right";
  for (i = 1; i <= y_ntick; i++) {
    var y_tick = parseInt((y_step + 0.1 / y_dec) * i * y_dec) / y_dec;
    context.fillText(y_tick.toFixed(2), x0, y0 - y_step * y_ratio * i);
  }

  // x_ticks_bar and y_ticks_bar.
  context.beginPath();
  // x ax_sums
  for (i = 1; i <= x_ntick; i++) {
    context.moveTo(x0 + x_step * x_ratio * i, y0);
    context.lineTo(x0 + x_step * x_ratio * i, y0 - y_bar);
  }

  // y ax_sums
  for (i = 1; i <= y_ntick; i++) {
    context.moveTo(x0, y0 - y_step * y_ratio * i);
    context.lineTo(x0 + x_bar, y0 - y_step * y_ratio * i);
  }

  context.stroke();

  //画点,第一个是隐藏的，跳过.

  for (i = 1; i < group_x.length; i++) {
    dot_star(group_x[i].value,group_y[i].value);
}
  //画线
  context.beginPath();

  var x_sum=0;
    var y_sum=0;
    var xy_sum=0;
    var x2_sum=0;
    var x3_sum=0;
    var x4_sum=0;
    var x2y_sum=0;

    for (i = 1; i < group_x.length; i++) {
    var x1 = parseFloat(group_x[i].value);
    var y1 = parseFloat(group_y[i].value);

    x_sum=x_sum+x1;
    y_sum=y_sum+y1;
    xy_sum=xy_sum+x1*y1;
    x2_sum=x2_sum+x1**2;
    x3_sum=x3_sum+x1**3;
    x4_sum=x4_sum+x1**4;
    x2y_sum=x2y_sum+x1**2*y1;

  }
  
  var n=group_x.length-1;
var a0=(x2y_sum*x2_sum**2 - xy_sum*x2_sum*x3_sum - x4_sum*y_sum*x2_sum + y_sum*x3_sum**2 - x_sum*x2y_sum*x3_sum + x_sum*x4_sum*xy_sum)/(x4_sum*x_sum**2 - 2*x_sum*x2_sum*x3_sum + x2_sum**3 - n*x4_sum*x2_sum + n*x3_sum**2);

var a1 =(x2_sum**2*xy_sum + n*x3_sum*x2y_sum - n*x4_sum*xy_sum - x_sum*x2_sum*x2y_sum + x_sum*x4_sum*y_sum - x2_sum*x3_sum*y_sum)/(x4_sum*x_sum**2 - 2*x_sum*x2_sum*x3_sum + x2_sum**3 - n*x4_sum*x2_sum + n*x3_sum**2);

var a2 =(x2y_sum*x_sum**2 - xy_sum*x_sum*x2_sum - x3_sum*y_sum*x_sum + y_sum*x2_sum**2 - n*x2y_sum*x2_sum + n*x3_sum*xy_sum)/(x4_sum*x_sum**2 - 2*x_sum*x2_sum*x3_sum + x2_sum**3 - n*x4_sum*x2_sum + n*x3_sum**2);
//alert("a0="+a0+";a1="+a1+";a2="+a2);
var n_insert = 10; //插入的中间值数目.

  for (i = 2; i < group_x.length; i++) {
    var x1 = parseFloat(group_x[i-1].value);
    var y1 = a2*x1**2+a1*x1+a0;
    var x2 = parseFloat(group_x[i].value);
    var y2 = a2*x2**2+a1*x2+a0;

    for (j = 0; j <= n_insert; j++) {
    // 1
    var x_start = (x2 - x1) * j / (n_insert + 1)+x1;
    var x_end = x1 + (x2 - x1) * (j + 1) / (n_insert + 1);
    //alert(x1);alert(x2);alert(j);alert(n_insert);
    var y_start = a2 * x_start ** 2 + a1 * x_start + a0;
    var y_end = a2 * x_end ** 2 +a1 * x_end + a0;
    
    context.moveTo(x0 + (parseInt(x_start * 10 ** floatn) / 10 ** floatn * x_ratio), y0 - (parseInt(y_start * 10 ** floatn) / 10 ** floatn * y_ratio));

    context.lineTo(x0 + (parseInt(x_end * 10 ** floatn) / 10 ** floatn * x_ratio), y0 - (parseInt(y_end * 10 ** floatn) / 10 ** floatn * y_ratio));
  }
  }

  context.stroke();

}

function run_exp() {
  var group_x = document.getElementsByName("var_x");
  var group_y = document.getElementsByName("var_y");


  var x_range = parseInt(xmax.value * 10 ** floatn) / 10 ** floatn - parseInt(xmin.value ** 10 ** floatn) / 10 ** floatn;
  var y_range = parseInt(ymax.value * 10 ** floatn) / 10 ** floatn - parseInt(ymin.value ** 10 ** floatn) / 10 ** floatn;
  var x_ntick = 5;
  var y_ntick = 5;
  var x_step = 1;
  var y_step = 1;
  var x_dec = 1000; //小数点位数.
  var y_dec = 100;
  var x_bar = 5;
  var y_bar = 5;

  // 如果x_range 10级别，整数, 1级别，1位小数，0.1级别，2位小数.
  // if x_range>10 
  //   else x_range>1 
  // 10/5=2, 2000/=1000,2.000
  x_step = parseInt((x_range / x_ntick + 0.5 / x_dec) * x_dec) / x_dec;
  //0.1/3+0.05=

  y_step = parseInt((y_range / y_ntick + 0.5 / y_dec) * y_dec) / y_dec;

  //x_range=100  画到 x_total=10上，那么，1要分成10格.
  // xp,yp = xp*0.1, yp*0.1
  // 
  x_ratio = x_total / x_range;
  y_ratio = y_total / y_range;
  // x ax_sums, label
  context.textAlign = "center";
  for (i = 1; i <= x_ntick; i++) {
    var x_tick = parseInt((x_step + 0.1 / x_dec) * i * x_dec) / x_dec;
    context.fillText(x_tick.toFixed(3), x0 - shift_x + x_step * x_ratio * i, y0 + shift_y);
  }

  // y ax_sums, 偏下，也就是太大了。搞小一点.
  context.textAlign = "right";
  for (i = 1; i <= y_ntick; i++) {
    var y_tick = parseInt((y_step + 0.1 / y_dec) * i * y_dec) / y_dec;
    context.fillText(y_tick.toFixed(2), x0, y0 - y_step * y_ratio * i);
  }

  // x_ticks_bar and y_ticks_bar.
  context.beginPath();
  // x ax_sums
  for (i = 1; i <= x_ntick; i++) {
    context.moveTo(x0 + x_step * x_ratio * i, y0);
    context.lineTo(x0 + x_step * x_ratio * i, y0 - y_bar);
  }

  // y ax_sums
  for (i = 1; i <= y_ntick; i++) {
    context.moveTo(x0, y0 - y_step * y_ratio * i);
    context.lineTo(x0 + x_bar, y0 - y_step * y_ratio * i);
  }

  context.stroke();

  //画点,第一个是隐藏的，跳过.

  for (i = 1; i < group_x.length; i++) {
    dot_star(group_x[i].value,group_y[i].value);
}
  //画线
  context.beginPath();

    var y_sum=0;
    var xy_sum=0;
    var x2y_sum=0;
    var ylny_sum=0;
    var xylny_sum=0;


    for (i = 1; i < group_x.length; i++) {
    var x1 = parseFloat(group_x[i].value);
    var y1 = parseFloat(group_y[i].value);

    y_sum=y_sum+y1;
    xy_sum=xy_sum+x1*y1;
    x2y_sum=x2y_sum+x1**2*y1;
    ylny_sum=ylny_sum+y1*Math.log(y1);
    xylny_sum=xylny_sum+x1*y1*Math.log(y1);

  }
  
var a0=(x2y_sum*ylny_sum - xy_sum*xylny_sum)/(y_sum*x2y_sum - xy_sum**2);

var a1 =(y_sum*xylny_sum - xy_sum*ylny_sum)/(y_sum*x2y_sum - xy_sum**2);

var n_insert = 10; //插入的中间值数目.

  for (i = 2; i < group_x.length; i++) {
    var x1 = parseFloat(group_x[i-1].value);
    //var y1 = a0*Math.exp(a1*x1);
    var x2 = parseFloat(group_x[i].value);
    //var y2 = a0*Math.exp(a1*x2);

    for (j = 0; j <= n_insert; j++) {
    // 1
    var x_start = (x2 - x1) * j / (n_insert + 1)+x1;
    var x_end = x1 + (x2 - x1) * (j + 1) / (n_insert + 1);
    //alert(x1);alert(x2);alert(j);alert(n_insert);
    var y_start = Math.exp(a0)*Math.exp(a1*x_start); 
    var y_end = Math.exp(a0)*Math.exp(a1*x_end);
    
    context.moveTo(x0 + (parseInt(x_start * 10 ** floatn) / 10 ** floatn * x_ratio), y0 - (parseInt(y_start * 10 ** floatn) / 10 ** floatn * y_ratio));

    context.lineTo(x0 + (parseInt(x_end * 10 ** floatn) / 10 ** floatn * x_ratio), y0 - (parseInt(y_end * 10 ** floatn) / 10 ** floatn * y_ratio));
  }
  }

  context.stroke();

}

function run_curve() {
  // var group_x = document.getElementsByName("0");
  var group_x = document.getElementsByName("var_x");
  var group_y = document.getElementsByName("var_y");


  var x_range = parseInt(xmax.value * 10 ** floatn) / 10 ** floatn - parseInt(xmin.value ** 10 ** floatn) / 10 ** floatn;
  var y_range = parseInt(ymax.value * 10 ** floatn) / 10 ** floatn - parseInt(ymin.value ** 10 ** floatn) / 10 ** floatn;
  var x_ntick = 5;
  var y_ntick = 5;
  var x_step = 1;
  var y_step = 1;
  var x_dec = 1000; //小数点位数.
  var y_dec = 100;
  var x_bar = 5;
  var y_bar = 5;

  // 如果x_range 10级别，整数, 1级别，1位小数，0.1级别，2位小数.
  // if x_range>10 
  //   else x_range>1 
  // 10/5=2, 2000/=1000,2.000
  x_step = parseInt((x_range / x_ntick + 0.5 / x_dec) * x_dec) / x_dec;
  //0.1/3+0.05=

  y_step = parseInt((y_range / y_ntick + 0.5 / y_dec) * y_dec) / y_dec;

  //x_range=100  画到 x_total=10上，那么，1要分成10格.
  // xp,yp = xp*0.1, yp*0.1
  // 
  x_ratio = x_total / x_range;
  y_ratio = y_total / y_range;
  // x axis, label
  context.textAlign = "center";
  for (i = 1; i <= x_ntick; i++) {
    var x_tick = parseInt((x_step + 0.1 / x_dec) * i * x_dec) / x_dec;
    context.fillText(x_tick.toFixed(3), x0 - shift_x + x_step * x_ratio * i, y0 + shift_y);
  }

  // y axis, 偏下，也就是太大了。搞小一点.
  context.textAlign = "right";
  for (i = 1; i <= y_ntick; i++) {
    var y_tick = parseInt((y_step + 0.1 / y_dec) * i * y_dec) / y_dec;
    context.fillText(y_tick.toFixed(2), x0, y0 - y_step * y_ratio * i);
  }

  // x_ticks_bar and y_ticks_bar.
  context.beginPath();
  // x axis
  for (i = 1; i <= x_ntick; i++) {
    context.moveTo(x0 + x_step * x_ratio * i, y0);
    context.lineTo(x0 + x_step * x_ratio * i, y0 - y_bar);
  }

  // y axis
  for (i = 1; i <= y_ntick; i++) {
    context.moveTo(x0, y0 - y_step * y_ratio * i);
    context.lineTo(x0 + x_bar, y0 - y_step * y_ratio * i);
  }

  context.stroke();

  //画点,第一个是隐藏的，跳过.

  for (i = 1; i < group_x.length; i++) {
    dot_star(group_x[i].value,group_y[i].value);
}
  //画线
  context.beginPath();

  var n_insert = 10; //插入的中间值数目.
  // i=3
  var x1 = parseFloat(group_x[1].value);
  var x2 = parseFloat(group_x[2].value);
  var x3 = parseFloat(group_x[3].value);
  var y1 = parseFloat(group_y[1].value);
  var y2 = parseFloat(group_y[2].value);
  var y3 = parseFloat(group_y[3].value);

  var a1 = ((y1 - y2 )*(x1 - x3) - (y1 - y3)*(x1 - x2)) / ((x1 ** 2 - x2 ** 2)*(x1 - x3) - (x1 ** 2 - x3 ** 2)*(x1 - x2));
  var b1 = ((y1  - y2 )*(x1 ** 2 - x3 ** 2) - (y1 - y3 )*(x1 ** 2 - x2 ** 2)) / ((x1 - x2)*(x1 ** 2 - x3 ** 2) - (x1 - x3)*(x1 ** 2 - x2 ** 2));
  var c1 = y1  - a1 * x1 ** 2 - b1 * x1;

  // 从x1,y1, 到x2,y2      
  for (j = 0; j <= n_insert; j++) {
    // 1
    var x_start = (x2 - x1) * j / (n_insert + 1)+x1;
    var x_end = x1 + (x2 - x1) * (j + 1) / (n_insert + 1);
    //alert(x1);alert(x2);alert(j);alert(n_insert);
    var y_start = a1 * x_start ** 2 + b1 * x_start + c1;
    var y_end = a1 * x_end ** 2 +b1 * x_end + c1;
    
    context.moveTo(x0 + (parseInt(x_start * 10 ** floatn) / 10 ** floatn * x_ratio), y0 - (parseInt(y_start * 10 ** floatn) / 10 ** floatn * y_ratio));

    context.lineTo(x0 + (parseInt(x_end * 10 ** floatn) / 10 ** floatn * x_ratio), y0 - (parseInt(y_end * 10 ** floatn) / 10 ** floatn * y_ratio));
  }

  // 从x2,y2, 到x3,y3      
  for (j = 0; j <= n_insert; j++) {
    var x_start = x2 + (x3 - x2) * j / (n_insert + 1);
    var x_end = x2 + (x3 - x2) * (j + 1) / (n_insert + 1);

    var y_start = a1 * x_start ** 2 + b1 * x_start + c1;
    var y_end = a1 * x_end ** 2 + b1 * x_end + c1;

    context.moveTo(x0 + (parseInt(x_start * 10 ** floatn) / 10 ** floatn * x_ratio), y0 - (parseInt(y_start * 10 ** floatn) / 10 ** floatn * y_ratio));

    context.lineTo(x0 + (parseInt(x_end * 10 ** floatn) / 10 ** floatn * x_ratio), y0 - (parseInt(y_end * 10 ** floatn) / 10 ** floatn * y_ratio));

  }

  // 如果有i=4的话:
  for (i = 4; i < group_x.length; i++) {
    var x1 = parseFloat(group_x[i - 1].value);
    var x2 = parseFloat(group_x[i].value);
    var y1 = parseFloat(group_y[i - 1].value);
    var y2 = parseFloat(group_y[i].value);

    var a2 = ((y2 - y1) - (2 * a1 * x1 + b1) * (x2 - x1)) / ((x2 ** 2 - x1 ** 2) - 2 * x1 * (x2 - x1));
    var b2 = 2 * a1 * x1 - 2 * a2 * x1 + b1;
    var c2 = y1 - a2 * x1 ** 2 - b2 * x1;

    // 从x1,y1, 到x2,y2      
    for (j = 0; j <= n_insert; j++) {
      var x_start = x1 + (x2 - x1) * j / (n_insert + 1);
      var x_end = x1 + (x2 - x1) * (j + 1) / (n_insert + 1);

      var y_start = a2 * x_start ** 2 + b2 * x_start + c2;
      var y_end = a2 * x_end ** 2 + b2 * x_end + c2;

      context.moveTo(x0 + (parseInt(x_start * 10 ** floatn) / 10 ** floatn * x_ratio), y0 - (parseInt(y_start * 10 ** floatn) / 10 ** floatn * y_ratio));

      context.lineTo(x0 + (parseInt(x_end * 10 ** floatn) / 10 ** floatn * x_ratio), y0 - (parseInt(y_end * 10 ** floatn) / 10 ** floatn * y_ratio));

      //context.fillRect(x0 + (parseInt(x_start * 10 ** floatn) / 10 ** floatn * x_ratio - 0.5 * rec_size), y0 - (parseInt(y_start * 10 ** floatn) / 10 ** floatn * y_ratio + 0.5 * rec_size), rec_size, rec_size);
    }
    //暂存到新的变量里.
    var a1 = a2;
    var b1 = b2;
    var c1 = c2;
  }
  context.stroke();

}

function clear() {
  var w = x_max;
  var h = y_max;
  //context.clearRect(0, 0, w, h); //会重置画布，x坐标会移动.
  drawing.width = w;
  drawing.height = h;

}