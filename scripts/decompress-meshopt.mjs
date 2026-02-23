// decompress-meshopt.mjs
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { textureCompress, draco } from '@gltf-transform/functions';
import { MeshoptDecoder } from 'meshoptimizer';
import sharp from 'sharp';
import draco3d from 'draco3d';

await MeshoptDecoder.ready;

const io = new NodeIO()
    .registerExtensions(ALL_EXTENSIONS)
    .registerDependencies({
        'meshopt.decoder': MeshoptDecoder,
        'draco3d.encoder': await draco3d.createEncoderModule(),
        'draco3d.decoder': await draco3d.createDecoderModule(),
    });

console.log('Lese Audi A7.glb...');
const doc = await io.read('../3D-Models/Audi A7.glb');

console.log('Komprimiere Texturen (WebP 75%)...');
await doc.transform(
    textureCompress({ encoder: sharp, targetFormat: 'webp', quality: 75 })
);

console.log('Draco-Kompression...');
await doc.transform(
    draco({ compressionLevel: 7 })
);

console.log('Schreibe audi_final.glb...');
await io.write('../New-Template/public/audi_final.glb', doc);

const { statSync } = await import('fs');
const size = statSync('../New-Template/public/audi_final.glb').size / 1024 / 1024;
console.log(`Fertig! Größe: ${size.toFixed(1)} MB`);
