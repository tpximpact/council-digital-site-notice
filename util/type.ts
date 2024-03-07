import { Id } from "sanity";

export type Housing = {
  affordableResidentialUnits: number;
  residentialUnits: number;
};

export type Jobs = {
  min: number;
  max: number;
};

export type ProposedLandUse = {
  classB: boolean;
  classC: boolean;
  classE: boolean;
  classF: boolean;
  suiGeneris: boolean;
  suiGenerisDetail: string;
};

export type Data = {
  id: Id;
  name: string;
  address: string;
  description: string;
  height: number;
  applicationNumber: string;
  commentDeadline: string;
  applicationType: string;
  image_head?: string;
  image_gallery: any[];
  applicationUpdatesUrl?: string;
};

export type DataDetails = {
  _id: string;
  name: string;
  development_description?: string;
  development_address: string;
  application_type?: string;
  proposedLandUse?: ProposedLandUse;
  height?: number;
  constructionTime?: string;
  applicationNumber?: string;
  housing: Housing;
  showHousing?: boolean;
  showHealthcare?: boolean;
  healthcareDemand?: number;
  showOpenSpace?: boolean;
  openSpaceArea?: number;
  showJobs?: boolean;
  jobs?: Jobs;
  showCarbon?: boolean;
  carbonEmissions?: number;
  showAccess?: boolean;
  access?: string;
  applicationStage: any;
  valid_from_date: string;
  image_head?: string;
  image_gallery: any[];
  enableComments?: boolean;
  commentDeadline: string;
  applicationType: string;
  address: string;
  description: string;
  applicationUpdatesUrl: string;
  applicationDocumentsUrl: string;
};

export type DataTypeArray = {
  data: Data[];
};

export type PaginationType = {
  dataId: { _id: string }[];
  data: Data[];
  paginationData?: Data[];
  globalContent: any;
};

export type CommentForm = {
  [key: number]: string;
};

export type PersonalDetailsForm = {
  name: string;
  address: string;
  email: string;
  phone: string;
  postcode: string;
  consent: boolean;
};

export type CommentType = {
  onChange: () => void;
  label: string;
  commentForm: CommentForm;
  setCommentForm: (value: any) => void;
  setQuestion: (value: number) => void;
  selectedCheckbox: number[];
  question: number;
};

export type PersonalDetailsType = {
  onChange: () => void;
  personalDetailsForm: PersonalDetailsForm;
  setPersonalDetailsForm: (value: any) => void;
  setQuestion: (value: any) => void;
  selectedCheckbox: number[];
};

export type FeedbackQuestionType = {
  question: number;
  onChangeQuestion: () => void;
  selectedCheckbox: number[];
  setSelectedCheckbox: (value: number[]) => void;
  label: string;
  setQuestion: (value: any) => void;
};

export type ImpactType = {
  onChange: () => void;
  setSelectedCheckbox: (value: number[]) => void;
  selectedCheckbox: number[];
  setQuestion: (value: number) => void;
};

export type FeelingType = {
  onChange: () => void;
  feelingForm: string;
  setFeelingForm: (value: string) => void;
};

export type ContextApplicationProps = {
  globalInfo: any;
  setGlobalInfo: (value: any) => void;
};
