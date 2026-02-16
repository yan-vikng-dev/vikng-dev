import type { SVGProps } from "react";

export function CloudflareWorkersIcon({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 128 128"
      className={className}
      fill="currentColor"
      {...props}
    >
      <path d="M33.882 9.694 48.491 36.05 35.075 60.199a7.75 7.75 0 0 0 0 7.543l13.416 24.209-14.609 26.356a15.501 15.501 0 0 1-6.559-6.172L4.068 71.737a15.563 15.563 0 0 1 0-15.503l23.255-40.398a15.501 15.501 0 0 1 6.559-6.142z" />
      <path d="m100.665 15.835 23.255 40.398a15.485 15.485 0 0 1 0 15.503l-23.255 40.398a15.504 15.504 0 0 1-13.416 7.752H63.994l28.92-52.145a7.75 7.75 0 0 0 0-7.513L63.994 8.084h23.255a15.502 15.502 0 0 1 13.416 7.751z" />
    </svg>
  );
}
