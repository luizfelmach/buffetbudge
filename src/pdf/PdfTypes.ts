export type ServiceType = {
    label: string;
    items: string[];
  };
  
  export type BudgeType = {
    to: string
    guests: number;
    entry?: string;
    services: ServiceType[];
    comments: string[];
    price: number;
  };
  