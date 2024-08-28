export function checkAllowedUpdateFields(
  application: { [key: string]: any },
  data: { [key: string]: any },
) {
  return (
    application.applicationType !== data.applicationType ||
    application.description !== data.description
  );
}
