// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url, ga) => {
  window.gtag("config", ga, {
    page_path: url,
    cookie_flags: "SameSite=None;Secure",
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
    cookie_flags: "SameSite=None;Secure",
  });
};
