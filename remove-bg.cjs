const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

async function removeWhiteBackground() {
    try {
        const imagePath = './public/logo.png';
        const image = await loadImage(imagePath);

        const canvas = createCanvas(image.width, image.height);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(image, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Loop through all pixels (4 bytes per pixel: R, G, B, A)
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            // If the pixel is white or very close to white (light grey artifacting)
            // make it completely transparent.
            if (r > 240 && g > 240 && b > 240) {
                data[i + 3] = 0; // Alpha channel to 0 (transparent)
            }
        }

        ctx.putImageData(imageData, 0, 0);

        const out = fs.createWriteStream('./public/logo-transparent.png');
        const stream = canvas.createPNGStream();
        stream.pipe(out);

        out.on('finish', () => console.log('Successfully created transparent logo!'));
    } catch (e) {
        console.error('Failed to process image:', e);
    }
}

removeWhiteBackground();
