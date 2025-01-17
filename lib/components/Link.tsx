import { AnchorHTMLAttributes, DetailedHTMLProps } from "react";

import { useRouter } from "../hooks/useRouter";
import { History, NavigateOptions } from "../types";

export const Link = ({
  pathname,
  query,
  replace,
  ...anchorProps
}: History &
  NavigateOptions &
  Omit<
    DetailedHTMLProps<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >,
    "href"
  >) => {
  const url = query
    ? `${pathname}?${new URLSearchParams(query).toString()}`
    : pathname;
  const router = useRouter();
  return (
    <a
      {...anchorProps}
      href={url}
      onClick={(e) => {
        e.preventDefault();
        router.navigate({ pathname, query }, { replace });
        anchorProps.onClick?.(e);
      }}
    />
  );
};
