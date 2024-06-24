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

type EditBillFormProps = {
  salesId: string;
  transactionNo: string;
  menuItems: MenuItem[];
  staffs: Staff[];
  areas: Area[];
  initial: {
    salesId: string;
    staffId: string;
    areaId: string;
    records: { menuItemId: string; quantitySold: string }[];
  };
};

export type { BillFormProps, EditBillFormProps };
