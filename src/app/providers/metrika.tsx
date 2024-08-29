import { Router } from "next/router";
import Script, { ScriptProps } from "next/script";
import React, { createContext, FC, ReactNode, useEffect, useMemo } from "react";

import { env } from "@/shared/consts";
import { InitParameters, ym } from "@/shared/lib/ym";

export const MetricaTagIDContext = createContext<number | null>(null);

interface Props {
  children: ReactNode;
  tagID?: number;
  strategy?: ScriptProps["strategy"];
  initParameters?: InitParameters;
  shouldUseAlternativeCDN?: boolean;
}

export const useTrackRouteChange = () => {
  useEffect(() => {
    const handleRouteChange = (url: URL): void => {
      ym("hit", url.toString());
    };

    Router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);
};

export const YandexMetricaProvider: FC<Props> = ({
  children,
  tagID,
  strategy = "afterInteractive",
  initParameters,
  shouldUseAlternativeCDN = false,
}) => {
  const YANDEX_METRICA_ID = env.ym;
  const id = useMemo(() => {
    return tagID || (YANDEX_METRICA_ID ? Number(YANDEX_METRICA_ID) : null);
  }, [YANDEX_METRICA_ID, tagID]);

  useTrackRouteChange();

  if (!id) {
    console.warn("[next-yandex-metrica] Yandex.Metrica tag ID is not defined");

    return <>{children}</>;
  }

  const scriptSrc = shouldUseAlternativeCDN
    ? "https://cdn.jsdelivr.net/npm/yandex-metrica-watch/tag.js"
    : "https://mc.yandex.ru/metrika/tag.js";

  return (
    <>
      <Script id="yandex-metrica" strategy={strategy}>
        {`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "${scriptSrc}", "ym");
          ym(${id}, "init", ${JSON.stringify(initParameters || {})});
        `}
      </Script>
      <noscript id="yandex-metrica-pixel">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://mc.yandex.ru/watch/${id}`}
          alt=""
        />
      </noscript>
      <MetricaTagIDContext.Provider value={id}>
        {children}
      </MetricaTagIDContext.Provider>
    </>
  );
};
