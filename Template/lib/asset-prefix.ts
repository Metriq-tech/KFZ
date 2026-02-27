/**
 * Prepend the assetPrefix to image/asset paths for GitHub Pages SubPath deploys.
 *
 * Next.js `assetPrefix` only covers `_next/` assets, NOT <img src>.
 * The build script sets NEXT_PUBLIC_ASSET_PREFIX in next.config.ts env{}.
 *
 * In dev:  NEXT_PUBLIC_ASSET_PREFIX is empty → paths unchanged
 * In prod: NEXT_PUBLIC_ASSET_PREFIX = '/slug' → /mocks/x.avif → /slug/mocks/x.avif
 */

const prefix = process.env.NEXT_PUBLIC_ASSET_PREFIX ?? '';

export function withPrefix(path: string): string {
    if (!prefix || !path) return path;
    if (path.startsWith(prefix)) return path;   // already prefixed
    if (path.startsWith('/')) return prefix + path;
    return path;
}
