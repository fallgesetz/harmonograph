window.onload = function () {
    var canvas = document.getElementById("harmonograph");
    var context = canvas.getContext("2d");
    var STEP_SIZE = 0.02;

    function draw_path(ctx, path)
    {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(path[0][0], path[0][1]);
        for (var i = 1; i < path.length; i++)
        {
            coord = path[i];
            console.log(path);
            x = coord[0];
            y = coord[1];
            ctx.lineTo(x,y);
            console.log(x + "..." + y);
        }
        ctx.closePath();
        ctx.stroke();
    }

    function parabola(scale, x_intercept, y_intercept)
    {
    }

    function ellipse(A, B, k, x_0, y_0)
    {
        points = []
        for ( var t = 0; t < 2*Math.PI; t += STEP_SIZE) {
            x = A * Math.cos(k*t) + x_0;
            y = B * Math.sin(k*t) + y_0;
            points.push([x,y]);
        }
        return points;
    }

    function lissajous_curve(A, B, k1, k2, l1, l2, x_0, y_0, complete)
    {
        points = []
        for ( var t = 0; t < complete*Math.PI; t += STEP_SIZE) {
            x = A * Math.cos(k1*t + l1) + x_0;
            y = B * Math.sin(k2*t + l2) + y_0;
            points.push([x,y]);
        }
        return points;
    }

    draw_path(context, lissajous_curve(30, 30, 5, 9, 0, 0, 100, 100, 4));
};
