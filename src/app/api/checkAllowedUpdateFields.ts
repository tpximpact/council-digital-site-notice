export function checkAllowedUpdateFields(
  application: { [key: string]: any },
  data: { [key: string]: any },
) {
  const checks = {
    isActive: application.isActive !== data.isActive,
    planningId: application.planningId !== data.planningId,
    name: application.name !== data.name,
    description: application.description !== data.description,
    applicationType: application.applicationType !== data.applicationType,
    address: application.address !== data.address,
    applicationStage:
      JSON.stringify(application.applicationStage) !==
      JSON.stringify(data.applicationStage),
    location:
      JSON.stringify(application.location) !== JSON.stringify(data.location),
    proposedLandUse:
      JSON.stringify(application.proposedLandUse) !==
      JSON.stringify(data.proposedLandUse),
    enableComments: application.enableComments !== data.enableComments,
    consultationDeadline:
      application.consultationDeadline !== data.consultationDeadline,
    height: application.height !== data.height,
    constructionTime: application.constructionTime !== data.constructionTime,
    applicationDocumentsUrl:
      application.applicationDocumentsUrl !== data.applicationDocumentsUrl,
    applicationUpdatesUrl:
      application.applicationUpdatesUrl !== data.applicationUpdatesUrl,
    showOpenSpace: application.showOpenSpace !== data.showOpenSpace,
    openSpaceArea: application.openSpaceArea !== data.openSpaceArea,
    showHousing: application.showHousing !== data.showHousing,
    housing:
      JSON.stringify(application.housing) !== JSON.stringify(data.housing),
    showCarbon: application.showCarbon !== data.showCarbon,
    carbonEmissions: application.carbonEmissions !== data.carbonEmissions,
    showAccess: application.showAccess !== data.showAccess,
    access: application.access !== data.access,
    showJobs: application.showJobs !== data.showJobs,
    jobs: JSON.stringify(application.jobs) !== JSON.stringify(data.jobs),
  };

  return Object.values(checks).some((result) => result === true);
}
