var myCanvas = document.getElementById("myCanvas");
myCanvas.width = 340;
myCanvas.height = 170;

var ctx = myCanvas.getContext("2d");

/**
 * 
 * @param {*} ctx contex
 * @param {number} startX start position x
 * @param {number} startY start position y
 * @param {number} endX end position x
 * @param {number} endY end position y
 * @param {string} color
 */
function drawLine(ctx, startX, startY, endX, endY, color) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  ctx.restore();
}

function drawBar(
  ctx,
  upperLeftCornerX,
  upperLeftCornerY,
  width,
  height,
  color,
) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
  ctx.restore();
}

class BarChart {
  constructor(options) {
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;
    this.titleOptions = options.titleOptions;
    this.maxValue = Math.max(...Object.values(this.options.data));
    this.gap = options.gap || 0;
    this.padding = options.padding;
  }

  drawGridLines() {
    let canvasActualHeight = this.canvas.height - this.options.padding * 2;
    let gridValue = 0;
    while (gridValue <= this.maxValue) {
      let gridY =
        canvasActualHeight * (1 - gridValue / this.maxValue) +
        this.options.padding;
      drawLine(
        this.ctx,
        this.padding,
        gridY,
        this.canvas.width,
        gridY,
        gridValue === 0 ? "black" : this.options.gridColor
      );

      // Writing grid markers
      this.ctx.save();
      this.ctx.fillStyle = "black";
      this.ctx.textBaseline = "bottom";
      this.ctx.font = "bold 10px Arial";
      this.ctx.fillText(gridValue, 0, gridY + 4);
      this.ctx.restore();

      gridValue += this.options.gridStep;
    }
  }

  drawBars() {
    var canvasActualHeight = this.canvas.height - this.options.padding * 2;
    var canvasActualWidth = this.canvas.width - this.options.padding * 2;

    var barIndex = 0;
    var numberOfBars = Object.keys(this.options.data).length;
    var barSize = canvasActualWidth / numberOfBars;

    var values = Object.values(this.options.data);

    for (let val of values) {
      var barHeight = Math.round((canvasActualHeight * val) / this.maxValue);

      drawBar(
        this.ctx,
        this.options.padding + barIndex * barSize,
        this.canvas.height - barHeight - this.options.padding,
        barSize - this.gap,
        barHeight,
        this.colors[barIndex % this.colors.length]
      );

      barIndex++;
    }
  }

  drawLabel() {
    const canvasActualWidth = this.canvas.width - this.options.padding * 2;
    const labels = Object.keys(this.options.data)
    const barSize = canvasActualWidth / labels.length;
    labels.forEach((k, i) => {
      const xPos = this.options.padding + ((barSize - this.gap - 4) / 2) + (i * barSize);
      this.ctx.save();
      this.ctx.fillStyle = "black";
      this.ctx.textBaseline = "bottom";
      this.ctx.font = "bold 10px Arial";
      this.ctx.fillText(k, xPos, this.canvas.height);
      this.ctx.restore();
    })
  }

  draw() {
    this.drawGridLines();
    this.drawBars();
    this.drawLabel();
  }
}

var myBarchart = new BarChart({
  canvas: myCanvas,
  seriesName: "Tên dự án",
  padding: 20,
  gridStep: 1,
  gridColor: "#e5e3e3",
  gap: 26,
  data: {
    A: 2,
    B: 0.1,
    C: 3,
    E: 4,
    F: 4
  },
  colors: ["#3366cc"],
  titleOptions: {
    align: "center",
    fill: "black",
    font: {
      weight: "bold",
      size: "18px",
      family: "Hevetica"
    }
  }
});

myBarchart.draw();
