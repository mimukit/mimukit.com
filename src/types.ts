export type Site = {
  title: string;
  description: string;
  href: string;
  author: string;
  locale: string;
  location: string;
  email: string;
};

export type SocialLink = {
  href: string;
  label: string;
};

export type IconMap = {
  [key: string]: string;
};

export type CareerPosition = {
  id: string;
  title: string;
  company: string;
  companyUrl?: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string;
  subPositions?: Omit<
    CareerPosition,
    'subPositions' | 'company' | 'companyUrl' | 'location'
  >[];
};
