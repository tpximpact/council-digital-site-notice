export function checkAllowedUpdateFields(
  application: { [key: string]: any },
  data: { [key: string]: any },
) {
  return (
    application.applicationType !== data.applicationType ||
    application.planningId !== data.planningId ||
    application.description !== data.description ||
    application.isActive !== data.isActive ||
    application.address !== data.address ||
    application.applicationDocumentsUrl !== data.applicationDocumentsUrl ||
    application.consultationDeadline !== data.consultationDeadline ||
    application.height !== data.height ||
    application.proposedLandUse !== data.proposedLandUse
  );
}
