export type jobType = {
  id: string;
  image: string;
  jobType: string;
  name: string;
  type: string;
  location: string;
  desc: string;
  category: categoryJobType;
  needs: number;
  applicants: number;
  skills: string[];
};

export type optionType = {
  id: string;
  label: string;
};

export type filterFormType = {
  label: string;
  name: string;
  items: optionType[];
};

export type companyType = {
  image: string;
  totalJobs: number;
  name: string;
  description: string;
  categories: string;
};

export type categoryJobType = {
  id: string;
  name: string;
  totalJobs: number;
};
