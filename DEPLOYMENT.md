# PixelLocal - Deployment Guide

This guide covers deploying PixelLocal to Vercel or any static edge hosting platform.

## 1. Environment Variables

Configure the following environment variables in your deployment settings:

| Variable | Description | Required | Example |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical domain URL | **Yes** | `https://pixellocal.com` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID (optional) | No | `G-XXXXXXXXXX` |

## 2. Vercel Deployment

1. Import your Git repository to Vercel.
2. Select **Next.js** framework preset.
3. Set Build Command: `npm run build`
4. Set Output Directory: `.next`
5. Add `NEXT_PUBLIC_SITE_URL` environment variable.
6. Click **Deploy**.

## 3. Production Verification Checklist

- [x] All 14 tool routes static generation (`/heic-to-jpg`, `/compress-image-to-100kb`, `/resize-image`, etc.)
- [x] Canonical tags match `NEXT_PUBLIC_SITE_URL`
- [x] Dynamic `/sitemap.xml` returns 200 OK
- [x] Dynamic `/robots.txt` points to valid sitemap
- [x] Privacy notice exact wording rendered: "Files are processed locally in your browser. PixelLocal does not upload user files to its servers for normal image processing."
