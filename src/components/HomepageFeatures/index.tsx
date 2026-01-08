import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: ReactNode;
};

function Feature({ title, Svg, description }: FeatureItem) {
  return <></>;
}

export default function HomepageFeatures(): ReactNode {
  return <></>;
}
