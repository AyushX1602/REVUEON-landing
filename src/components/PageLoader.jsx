import React from 'react';

/**
 * PageLoader Component
 * Clean, animated loader for page content areas
 * Adapted from Revueon-final with Premium Lime Theme
 */
const PageLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] w-full animate-in fade-in duration-300">
      <div className="loader" />
      <style>{`
        .loader {
          position: relative;
          width: 2.5em;
          height: 2.5em;
          transform: rotate(165deg);
        }

        .loader:before,
        .loader:after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          display: block;
          width: 0.5em;
          height: 0.5em;
          border-radius: 0.25em;
          transform: translate(-50%, -50%);
        }

        .loader:before {
          animation: loaderBefore 2s infinite;
        }

        .loader:after {
          animation: loaderAfter 2s infinite;
        }

        @keyframes loaderBefore {
          0% {
            width: 0.5em;
            box-shadow: 1em -0.5em rgba(91, 95, 151, 0.75), /* Purple */
              -1em 0.5em rgba(71, 66, 61, 0.75); /* Dark */
          }
          35% {
            width: 2.5em;
            box-shadow: 0 -0.5em rgba(91, 95, 151, 0.75),
              0 0.5em rgba(71, 66, 61, 0.75);
          }
          70% {
            width: 0.5em;
            box-shadow: -1em -0.5em rgba(91, 95, 151, 0.75),
              1em 0.5em rgba(71, 66, 61, 0.75);
          }
          100% {
            box-shadow: 1em -0.5em rgba(91, 95, 151, 0.75),
              -1em 0.5em rgba(71, 66, 61, 0.75);
          }
        }

        @keyframes loaderAfter {
          0% {
            height: 0.5em;
            box-shadow: 0.5em 1em rgba(227, 242, 33, 0.75), /* Lime */
              -0.5em -1em rgba(227, 242, 33, 0.75); /* Lime */
          }
          35% {
            height: 2.5em;
            box-shadow: 0.5em 0 rgba(227, 242, 33, 0.75),
              -0.5em 0 rgba(227, 242, 33, 0.75);
          }
          70% {
            height: 0.5em;
            box-shadow: 0.5em -1em rgba(227, 242, 33, 0.75),
              -0.5em 1em rgba(227, 242, 33, 0.75);
          }
          100% {
            box-shadow: 0.5em 1em rgba(227, 242, 33, 0.75),
              -0.5em -1em rgba(227, 242, 33, 0.75);
          }
        }
      `}</style>
    </div>
  );
};

export default PageLoader;
