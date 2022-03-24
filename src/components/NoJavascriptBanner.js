import React from "react";

export default function NoJavascriptBanner() {
  return (
    <noscript>
      <div className="bg-brand-green text-brand-text-secondary px-4 py-2 text-sm text-center">
        <p>
          I think the web should still work without Javascript where possible.
          You should be able to view all content on my site but certain interactive features such as menus and forms
          may not work correctly.
        </p>
      </div>
    </noscript>
  )
}
