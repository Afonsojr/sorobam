"use client";

import dynamic from "next/dynamic";

const TreinoView = dynamic(() => import("./treino-view"), { ssr: false });

export default function TreinoClient() {
  return <TreinoView />;
}
