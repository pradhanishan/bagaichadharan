type MenuItem = {
  id: number;
  item: string;
  price: number;
};

type Staff = {
  id: number;
  name: string;
};

type Area = {
  id: number;
  name: string;
};

type BillFormProps = {
  menuItems: MenuItem[];
  staffs: Staff[];
  areas: Area[];
};

export type { BillFormProps };
