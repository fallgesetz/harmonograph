window.onload = function () {
    var canvas = document.getElementById("harmonograph");
    var context = canvas.getContext("2d");
    var STEP_SIZE = 0.02;
    var eps = 0.1;

    function draw_path(ctx, path)
    {
        console.log(path.length);
        ctx.save();
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(path[0][0], path[0][1]);
        for (var i = 1; i < path.length; i++)
        {
            coord = path[i];
            x = coord[0];
            y = coord[1];
            ctx.lineTo(x,y);
        }
//        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }

    function tween_path(ctx, path, fps, total) {
    	var seconds_delay = Math.round(1000/fps);
        console.log(seconds_delay);
    	for(var i = 0; i <= total; i += seconds_delay) {
            var begin = Math.round(i/total * path.length);
            var cur_path = path.slice(0, begin);
            window.setTimeout(function(cur_path, ctx) { 
                return function() {
                    draw_path(ctx, cur_path);
                };
            }(cur_path, ctx), i);
    	}
    }

    function ellipse(A, B, k, x_0, y_0, complete)
    {
        var points = [];
        for ( var t = 0; t < complete*2*Math.PI; t += STEP_SIZE) {
            x = A * Math.cos(k*t) + x_0;
            y = B * Math.sin(k*t) + y_0;
            points.push([x,y]);
        }
        return points;
    }

    function lissajous_curve(A, B, k1, k2, l1, l2, x_0, y_0, complete)
    {
        points = [];
	l1 = l1 * Math.random();
	l2 = l2 * Math.random();
        for ( var t = 0; t < complete*2*Math.PI; t += STEP_SIZE) {
            x = A * Math.cos(k1*t + l1) + x_0;
            y = B * Math.sin(k2*t + l2) + y_0;
            points.push([x,y]);
        }
        return points;
    }

    function input_polar_curve_to_path(x_str, y_str)
    {
	var points = [];
	for (var t = 0; t <= 2*Math.PI + eps; t += STEP_SIZE)
	{
		x = eval(x_str) + context.canvas.width/2;
		y = eval(y_str) + context.canvas.height/2;
                points.push([x,y]);
	}
        console.log(points);
	return points;
    }

//    l_path = lissajous_curve(200, 200, 150, 50, 0.5, 0.5, 300, 300, 1);
    l_path = input_polar_curve_to_path("100*Math.cos(t)", "100* Math.sin(t)");
    tween_path(context, l_path, 24, 12000);
};
