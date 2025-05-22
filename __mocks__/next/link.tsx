const Link = ({ href, children, ...rest }: any) => {
  let url = "";

  if (typeof href === "string") {
    url = href;
  } else if (typeof href === "object" && href !== null) {
    // Build URL from pathname and query
    url = href.pathname || "";
    if (href.query && typeof href.query === "object") {
      const params = new URLSearchParams(href.query).toString();
      if (params) {
        url += "?" + params;
      }
    }
  }

  return (
    <a href={url} {...rest}>
      {children}
    </a>
  );
};

export default Link;
