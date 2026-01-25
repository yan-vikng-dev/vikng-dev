import type { SVGProps } from "react";

export function FirestoreIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      {...props}
    >
      <g transform="translate(-7.75 6.3125) translate(7.6875 -6.5) matrix(1.70892 0 0 1.70446 -8.47825 -8.54802)">
        <path d="m12.01,5.23l-6.22,2.82l0,2.78l6.22,-2.82l6.22,2.82l0,-2.78l-6.22,-2.82z" />
        <path d="m12.01,10.06l-6.22,2.82l0,2.78l6.22,-2.82l6.22,2.82l0,-2.78l-6.22,-2.82z" />
        <path d="m17.42,16.6l-3.06,-1.39l-2.35,1.07l0,2.77l5.41,-2.45z" />
      </g>
    </svg>
  );
}
