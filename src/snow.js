class Snow {

    constructor(ctx, sw, sh) {
        this.ctx = ctx;
        this.sw = sw;
        this.sh = sh;
        this.x = Math.ceil(Math.random() * sw);
        this.y = 0;
        this.r = Math.ceil(Math.random() * 2);

        this.dx = Math.ceil(Math.random() * 4) + 2;
        this.dy = Math.ceil(sh / 50);
    }

    isHidden() {
        return this.x > this.sw || this.y > this.sh;
    }

    render() {
        this.ctx.fillStyle = 'white';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.ctx.fill();

        this.x += this.dx;
        this.y += this.dy;
    }
}


class Scene {

    constructor(canvas = {}) {
        this.canvas = canvas;
        const bcr = this.canvas.parentElement.getBoundingClientRect();
        this.ctx = this.canvas.getContext('2d');
        this.sw = this.canvas.width = bcr.width;
        this.sh = this.canvas.height = bcr.height;

        this.snow = [];

        this.startedAt = Date.now();
        this._render();
    }

    _spanSnow() {
        var timeLeft = Math.floor((Date.now() - this.startedAt) / 1000);
        var limit = ((1 - Math.cos(timeLeft / 10)) / 2) * 20;
        if (this.snow.length >= limit) {
            return;
        }
        this.snow.push(new Snow(this.ctx, this.sw, this.sh));
    }

    _clearHiddenSnow() {
        for (var i in this.snow) {
            if (this.snow[i].isHidden()) {
                this.snow.splice(i, 1);
            }
        }
    }

    _render() {
        this.ctx.clearRect(0, 0, this.sw, this.sh);

        this._spanSnow();

        this.snow.forEach(p => p.render());

        this._clearHiddenSnow();

        requestAnimationFrame(this._render.bind(this));
    }

}


window.addEventListener('load', function () {

    var elements = document.querySelectorAll('.animate-snow');
    elements.forEach(function(element) {
        var canvas = document.createElement('canvas');
        canvas.style.position='absolute';
        canvas.style.width='100%';
        canvas.style.height='100%';
        element.prepend(canvas);
        new Scene(canvas);
    });

});