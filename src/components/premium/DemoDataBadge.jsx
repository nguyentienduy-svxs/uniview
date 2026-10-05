// src/components/premium/DemoDataBadge.jsx

/**
 * Small inline badge labelling content as illustrative demo data.
 * Place near any demo content that a locked user sees.
 */
export default function DemoDataBadge({ className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10.5px] font-semibold text-amber-800 ${className}`}
    >
      <svg
        className="h-2.5 w-2.5 shrink-0 text-amber-600"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          clipRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          fillRule="evenodd"
        />
      </svg>
      D? li?u minh h?a
    </span>
  )
}
