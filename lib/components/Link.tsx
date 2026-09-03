import { AnchorHTMLAttributes, DetailedHTMLProps } from "react";

import { useRouter } from "../hooks/useRouter";
import { History } from "../types";

export const Link = ({
  children,
  pathname,
  query,
  replace,
  ...anchorProps
}: History &
  Omit<
    DetailedHTMLProps<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >,
    "href"
  > & { replace?: boolean }) => {
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
    >
      {children}
    </a>
  );
};
