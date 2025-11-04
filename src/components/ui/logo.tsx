import { cn } from '@/lib/utils';

function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={cn(
        'h-auto w-full text-neutral-900 transition-colors duration-300 dark:text-neutral-100',
        className,
      )}
      role="img"
      aria-label="Logo"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M99.5 261h313v236h-313z"
        style={{
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 30,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeMiterlimit: 10,
        }}
      />
      <path
        d="M412 497h85v-75.687c0-36.156-22.765-68.395-56.837-80.492L412.5 331M100 497H15v-75.687c0-36.156 22.765-68.395 56.837-80.492L99.5 331M354 119.14V218c0 15.42-3.56 30.02-9.91 43M158 123v95c0 15.42 3.56 30.02 9.92 43"
        style={{
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 30,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeMiterlimit: 10,
        }}
      />
      <path
        d="M332.977 123H158V74.023C158 41.425 184.425 15 217.023 15H392v48.977C392 96.575 365.575 123 332.977 123zM384 203h-30v-60h30c16.569 0 30 13.431 30 30v0c0 16.569-13.431 30-30 30zm-256 0h30v-60h-30c-16.569 0-30 13.431-30 30v0c0 16.569 13.431 30 30 30zm90-20h0m76 0h0m27 164.5 31.5 31.5M321 410.5l31.5-31.5M191 347.5 159.5 379m31.5 31.5L159.5 379m110.536-54.969-28.072 109.938"
        style={{
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 30,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeMiterlimit: 10,
        }}
      />
    </svg>
  );
}

export default Logo;
