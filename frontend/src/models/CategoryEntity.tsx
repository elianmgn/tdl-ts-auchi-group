type CategoryEntity = {
  id?: number; // Category ID
  name: string;   // Name of category
  description: string; // A brief description of the category
  type: string; // Type of category (Income | Expense),
  createdAt: Date;
};

const categoryEntity: CategoryEntity = {
  id: undefined,
  name: '',
  description: '',
  type: '',
  createdAt: new Date()
};

export default categoryEntity;