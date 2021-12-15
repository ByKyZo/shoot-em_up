class GameObject {
    constructor() {
        this.props = {
            width: null,
            height: null,
            x: null,
            y: null,
            top: null,
            right: null,
            bottom: null,
            left: null,
        };
    }

    draw(drawCallback) {
        drawCallback();
        this.update();
    }

    update() {
        this.props.top = this.props.y;
        this.props.right = this.props.x + this.props.width;
        this.props.bottom = this.props.y + this.props.height;
        this.props.left = this.props.x;
    }
}
