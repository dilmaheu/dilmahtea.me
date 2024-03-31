export default function LoadingSpinner(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      viewBox="0 0 24 24"
      class="inline align-middle w-6 h-6 animate-spin fill-white"
    >
      <path
        fill-rule="evenodd"
        d="M12 19c3.866 0 7-3.134 7-7 0-3.86599-3.134-7-7-7-3.86599 0-7 3.13401-7 7 0 3.866 3.13401 7 7 7Zm0 3c5.5228 0 10-4.4772 10-10 0-5.52285-4.4772-10-10-10C6.47715 2 2 6.47715 2 12c0 5.5228 4.47715 10 10 10Z"
        clip-rule="evenodd"
        opacity=".2"
      />
      <path d="M2 12C2 6.47715 6.47715 2 12 2v3c-3.86599 0-7 3.13401-7 7H2Z" />
    </svg>
  );
}
