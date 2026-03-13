import sharp from "sharp";
import fs from "fs";
import path from "path";
import crypto from "crypto";

export async function processImage(originalPath: string) {

    const resolutions = [1024, 800];
    const results = [];

    const fileName = path.basename(originalPath);
    const name = path.parse(fileName).name;
    const ext = path.parse(fileName).ext;

    const fileBuffer = fs.readFileSync(originalPath);
    const hash = crypto.createHash("md5").update(fileBuffer).digest("hex");

    for (const width of resolutions) {

        const outputDir = path.join("output", name, width.toString());

        fs.mkdirSync(outputDir, { recursive: true });

        const outputPath = path.join(outputDir, `${hash}${ext}`);

        await sharp(originalPath)
            .resize({ width })
            .toFile(outputPath);

        results.push({
            resolution: width,
            path: outputPath
        });

    }
    return results;
}