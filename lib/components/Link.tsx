import { AnchorHTMLAttributes, DetailedHTMLProps } from "react";

import { useRouter } from "../hooks/useRouter";
import { History } from "../types";

export const Link = ({
  pathname,
  query,
  replace,
  ...anchorProps
}: History & { replace?: boolean } & Omit<
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
        if (replace) {
          router.replace({ pathname, query });
        } else {
          router.push({ pathname, query });
        }
        anchorProps.onClick?.(e);
      }}
    />
  );
};
